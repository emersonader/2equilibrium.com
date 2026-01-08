import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, type Profile } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  name: string;
  tier: 'foundation' | 'transformation' | 'lifetime';
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from database
  const fetchUserProfile = async (authUser: SupabaseUser): Promise<User | null> => {
    console.log('🔍 fetchUserProfile called for user:', authUser.id);

    try {
      console.log('📡 Executing Supabase query...');
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      console.log('📦 Query response received');

      if (error) {
        console.error('❌ Error fetching profile:', {
          message: error?.message,
          details: error?.details,
          hint: error?.hint,
          code: error?.code
        });

      // If profile doesn't exist (PGRST116), try to create it
      if (error.code === 'PGRST116') {
        console.log('Profile not found, attempting to create...');
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: authUser.id,
            email: authUser.email!,
            name: authUser.user_metadata?.name || authUser.email!,
            tier: 'foundation',
            is_admin: false
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating profile:', insertError);
          return null;
        }

        if (newProfile) {
          return {
            id: newProfile.id,
            email: newProfile.email,
            name: newProfile.name || newProfile.email,
            tier: newProfile.tier,
            isAdmin: newProfile.is_admin
          };
        }
      }

        return null;
      }

      if (!profile) {
        console.error('⚠️ Profile is null despite no error');
        return null;
      }

      console.log('✅ Profile data received:', { email: profile.email, tier: profile.tier });

      return {
        id: profile.id,
        email: profile.email,
        name: profile.name || profile.email,
        tier: profile.tier,
        isAdmin: profile.is_admin
      };
    } catch (err: any) {
      console.error('💥 Exception in fetchUserProfile:', err);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user).then(setUser);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 Auth state changed:', event);

      if (session?.user) {
        console.log('👤 Session exists, fetching profile for:', session.user.email);
        const profile = await fetchUserProfile(session.user);

        if (profile) {
          console.log('✅ Profile set in context:', profile.email);
          setUser(profile);
        } else {
          console.error('❌ Profile fetch failed in auth state listener');
          setUser(null);
        }
      } else {
        console.log('👤 No session, clearing user');
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Profile will be created automatically by database trigger
        // Wait a moment for trigger to execute
        await new Promise(resolve => setTimeout(resolve, 1000));
        const profile = await fetchUserProfile(data.user);

        if (!profile) {
          throw new Error('Failed to create user profile. Please try again or contact support.');
        }

        setUser(profile);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log('🔐 Starting login process...');
    setLoading(true);
    try {
      console.log('📡 Authenticating with Supabase...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Authentication error:', error);
        throw error;
      }

      console.log('✅ Authentication successful');
      console.log('✅ Auth state listener will handle profile loading');

      // Don't manually fetch profile - let the onAuthStateChange listener handle it
      // This ensures the session is properly set in the Supabase client
    } catch (error: any) {
      console.error('❌ Login failed:', error.message);
      setLoading(false);
      throw new Error(error.message || 'Login failed');
    }
    // Note: loading state will be cleared by onAuthStateChange listener
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
