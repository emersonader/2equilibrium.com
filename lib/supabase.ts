import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Configuration:');
console.log('  URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('  Anon Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  throw new Error('Missing Supabase environment variables');
}

console.log('✅ Supabase client initialized');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export type Profile = {
  id: string;
  email: string;
  name: string | null;
  tier: 'foundation' | 'transformation' | 'lifetime';
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};

export type CheckIn = {
  id: string;
  user_id: string;
  weight: number | null;
  energy_level: number | null;
  notes: string | null;
  created_at: string;
};

export type ProgressData = {
  id: string;
  user_id: string;
  date: string;
  weight: number | null;
  energy_level: number | null;
  created_at: string;
};

export type Message = {
  id: string;
  user_id: string;
  sender: string;
  message: string;
  created_at: string;
};
