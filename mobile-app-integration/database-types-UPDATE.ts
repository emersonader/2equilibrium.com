/**
 * UPDATED database.types.ts
 *
 * Changes to Profile interface for website compatibility
 * File location: mobile-app/src/services/database.types.ts
 *
 * ⚠️ ONLY THE PROFILES SECTION CHANGED ⚠️
 * Keep all other tables/types as they are!
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SubscriptionPlan = 'foundation' | 'transformation' | 'lifetime';
export type SubscriptionStatus = 'trial' | 'active' | 'lapsed' | 'cancelled';
export type JournalEntryType = 'daily' | 'weekly_review' | 'freeform';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type UnitSystem = 'metric' | 'imperial';
export type BadgeCategory = 'streak' | 'chapter' | 'milestone' | 'special';
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type PostType = 'milestone' | 'badge' | 'streak' | 'chapter' | 'custom';
export type PostVisibility = 'public' | 'followers' | 'private';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;

          // ========================================
          // ✅ WEBSITE FIELDS (NEW)
          // ========================================
          email: string;                    // ← ADD THIS
          name: string | null;              // ← ADD THIS
          tier: string;                     // ← ADD THIS (foundation/transformation/lifetime)
          is_admin: boolean;                // ← ADD THIS

          // ========================================
          // 📱 MOBILE APP FIELDS (EXISTING)
          // ========================================
          full_name: string | null;
          avatar_url: string | null;
          onboarding_completed: boolean;
          notification_preferences: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;

          // ========================================
          // ✅ WEBSITE FIELDS (NEW)
          // ========================================
          email: string;                    // ← ADD THIS (required on insert)
          name?: string | null;             // ← ADD THIS (optional, auto-syncs with full_name)
          tier?: string;                    // ← ADD THIS (defaults to 'foundation')
          is_admin?: boolean;               // ← ADD THIS (defaults to false)

          // ========================================
          // 📱 MOBILE APP FIELDS (EXISTING)
          // ========================================
          full_name?: string | null;
          avatar_url?: string | null;
          onboarding_completed?: boolean;
          notification_preferences?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;

          // ========================================
          // ✅ WEBSITE FIELDS (NEW)
          // ========================================
          email?: string;                   // ← ADD THIS
          name?: string | null;             // ← ADD THIS
          tier?: string;                    // ← ADD THIS
          is_admin?: boolean;               // ← ADD THIS

          // ========================================
          // 📱 MOBILE APP FIELDS (EXISTING)
          // ========================================
          full_name?: string | null;
          avatar_url?: string | null;
          onboarding_completed?: boolean;
          notification_preferences?: Json | null;
          updated_at?: string;
        };
        Relationships: [];
      };

      // ========================================
      // ALL OTHER TABLES STAY THE SAME
      // ========================================
      // subscriptions, user_progress, quiz_attempts, journal_entries,
      // milestones, food_entries, health_profiles, weight_history,
      // badges, user_badges, activity_posts, follows, post_encouragements, public_profiles
      // ... (keep them exactly as they are)

    };
  };
}

// Export Profile type for convenience
export type Profile = Database['public']['Tables']['profiles']['Row'];

// ========================================
// USAGE EXAMPLES:
// ========================================

/**
 * Example 1: Creating a profile (works for both website and mobile)
 *
 * const newProfile: Database['public']['Tables']['profiles']['Insert'] = {
 *   id: user.id,
 *   email: user.email,           // Website needs this
 *   name: fullName,              // Website needs this
 *   tier: 'foundation',          // Website needs this
 *   is_admin: false,             // Website needs this
 *   full_name: fullName,         // Mobile needs this
 *   avatar_url: null,            // Mobile needs this
 *   onboarding_completed: false, // Mobile needs this
 * };
 */

/**
 * Example 2: Reading a profile (all fields available)
 *
 * const profile: Profile = await supabase
 *   .from('profiles')
 *   .select('*')
 *   .eq('id', userId)
 *   .single();
 *
 * // You can access both:
 * console.log(profile.email);      // Website field
 * console.log(profile.tier);       // Website field
 * console.log(profile.full_name);  // Mobile field
 * console.log(profile.avatar_url); // Mobile field
 */

/**
 * Example 3: Updating a profile
 *
 * await supabase
 *   .from('profiles')
 *   .update({
 *     full_name: newName,  // Updates mobile field
 *     name: newName,       // Also update website field (or trigger does it)
 *   })
 *   .eq('id', userId);
 */
