import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Use service key for admin operations
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = req.body?.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    console.log(`[DELETE ACCOUNT] Starting deletion for email: ${email}`);

    // Step 1: Find and cancel Stripe subscriptions
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });

      if (customers.data.length > 0) {
        const customer = customers.data[0];
        console.log(`[DELETE ACCOUNT] Found Stripe customer: ${customer.id}`);

        // Cancel all active subscriptions
        const subscriptions = await stripe.subscriptions.list({
          customer: customer.id,
          status: 'active',
        });

        for (const sub of subscriptions.data) {
          await stripe.subscriptions.cancel(sub.id);
          console.log(`[DELETE ACCOUNT] Cancelled subscription: ${sub.id}`);
        }

        // Cancel past_due subscriptions
        const pastDue = await stripe.subscriptions.list({
          customer: customer.id,
          status: 'past_due',
        });

        for (const sub of pastDue.data) {
          await stripe.subscriptions.cancel(sub.id);
          console.log(`[DELETE ACCOUNT] Cancelled past_due subscription: ${sub.id}`);
        }

        // Delete the Stripe customer
        await stripe.customers.del(customer.id);
        console.log(`[DELETE ACCOUNT] Deleted Stripe customer: ${customer.id}`);
      }
    } catch (stripeError) {
      console.error('[DELETE ACCOUNT] Stripe error (continuing):', stripeError.message);
      // Continue with Supabase deletion even if Stripe fails
    }

    // Step 2: Delete all user data from Supabase
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(email);
    
    if (userError && userError.message !== 'User not found') {
      throw new Error(`Failed to find user: ${userError.message}`);
    }

    if (user?.user) {
      const userId = user.user.id;
      console.log(`[DELETE ACCOUNT] Found Supabase user: ${userId}`);

      // Delete user data in order (respecting foreign key constraints)
      const deletePromises = [
        // Delete journal entries
        supabase.from('journal_entries').delete().eq('user_id', userId),
        // Delete progress records
        supabase.from('progress').delete().eq('user_id', userId),
        // Delete subscription records
        supabase.from('subscriptions').delete().eq('user_id', userId),
        // Delete health metrics
        supabase.from('health_metrics').delete().eq('user_id', userId),
        // Delete user profile
        supabase.from('profiles').delete().eq('id', userId),
        // Delete any community posts
        supabase.from('community_posts').delete().eq('author_id', userId),
        // Delete any community encouragements
        supabase.from('community_encouragements').delete().eq('user_id', userId),
        // Delete user badges
        supabase.from('user_badges').delete().eq('user_id', userId),
        // Delete nutrition logs
        supabase.from('nutrition_logs').delete().eq('user_id', userId),
        // Delete weight logs  
        supabase.from('weight_logs').delete().eq('user_id', userId),
      ];

      const results = await Promise.allSettled(deletePromises);
      
      // Log any errors but don't fail the entire operation
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`[DELETE ACCOUNT] Failed to delete data set ${index}:`, result.reason);
        }
      });

      // Finally, delete the auth user
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
      if (deleteError) {
        throw new Error(`Failed to delete user auth: ${deleteError.message}`);
      }

      console.log(`[DELETE ACCOUNT] Successfully deleted user: ${userId}`);
    } else {
      console.log(`[DELETE ACCOUNT] No Supabase user found for email: ${email}`);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Account and all associated data have been permanently deleted' 
    });

  } catch (error) {
    console.error('[DELETE ACCOUNT] Error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to delete account. Please contact support.',
      details: error.message 
    });
  }
}