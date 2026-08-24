import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Default Mock Fallback Profiles for seamless development testing
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  
  // Instant synchronous hydration from localStorage cache
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('godirect_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('godirect_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('godirect_role') || null;
  });

  const [loading, setLoading] = useState(true);

  // Sync state to localStorage cache
  useEffect(() => {
    if (user) {
      localStorage.setItem('godirect_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('godirect_user');
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('godirect_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('godirect_profile');
    }
  }, [profile]);

  useEffect(() => {
    if (role) {
      localStorage.setItem('godirect_role', role);
    } else {
      localStorage.removeItem('godirect_role');
    }
  }, [role]);

  // Initialize Supabase Auth Listener
  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session: activeSession } }) => {
      if (activeSession) {
        setSession(activeSession);
        setUser(activeSession.user);
        fetchUserProfile(activeSession.user.id);
      }
      setLoading(false);
    }).catch(err => {
      console.warn('Supabase getSession error:', err);
      setLoading(false);
    });

    // 2. Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      if (currentSession?.user) {
        setUser(currentSession.user);
        await fetchUserProfile(currentSession.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setRole(null);
        localStorage.removeItem('godirect_user');
        localStorage.removeItem('godirect_profile');
        localStorage.removeItem('godirect_role');
        localStorage.removeItem('godirect_portal');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch or Create Profile from Supabase `profiles` table
  async function fetchUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('Error fetching profile from Supabase:', error);
        return;
      }

      if (data) {
        setProfile(data);
        setRole(data.role || 'user');
      } else {
        // If profile row doesn't exist yet in public.profiles, use auth metadata
        const { data: authData } = await supabase.auth.getUser();
        const metaRole = authData?.user?.user_metadata?.role || 'user';
        const metaName = authData?.user?.user_metadata?.full_name || '';
        const metaPhone = authData?.user?.user_metadata?.phone || '';
        
        const fallbackProfile = {
          id: userId,
          email: authData?.user?.email,
          full_name: metaName,
          role: metaRole,
          phone: metaPhone
        };
        setProfile(fallbackProfile);
        setRole(metaRole);
      }
    } catch (err) {
      console.warn('Profile fetch error:', err);
    }
  }

  // Sign in with email and password
  const signInWithPassword = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with specified role ('user' | 'landlord' | 'admin')
  const signUpWithRole = async (email, password, fullName, chosenRole = 'user', phone = '') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: chosenRole,
            phone: phone
          }
        }
      });

      if (error) {
        // If error is DB trigger error, give helpful message or retry
        console.warn('Supabase auth signUp returned error:', error);
        throw error;
      }

      // Upsert into public.profiles client-side as well
      if (data?.user) {
        const newProfile = {
          id: data.user.id,
          email: email,
          full_name: fullName,
          role: chosenRole,
          phone: phone,
          created_at: new Date().toISOString()
        };

        try {
          await supabase.from('profiles').upsert(newProfile);
        } catch (dbErr) {
          console.warn('Client profile upsert error (ignored):', dbErr);
        }

        // Set local active state
        setUser(data.user);
        setProfile(newProfile);
        setRole(chosenRole);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setRole(null);
    } catch (error) {
      console.warn('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    profile,
    role,
    loading,
    signInWithPassword,
    signUpWithRole,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
