"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { showLoading, dismissToast, showError } from '@/utils/toast';

interface UserWithRole extends User {
  role?: string; // Add role to the user object
}

interface SessionContextType {
  session: Session | null;
  user: UserWithRole | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserRole = async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role:roles(name)')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error.message);
        return undefined;
      }
      return data?.role?.name;
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          // Redirect to login if trying to access a protected route after sign out
          if (location.pathname.startsWith('/owner/dashboard') || location.pathname.startsWith('/admin/dashboard')) {
            navigate('/owner/login'); // Or a generic login page
          }
        } else if (currentSession) {
          const role = await fetchUserRole(currentSession.user.id);
          const userWithRole: UserWithRole = { ...currentSession.user, role };
          setSession(currentSession);
          setUser(userWithRole);

          // Redirect authenticated users from login/register pages to their dashboard
          if (location.pathname === '/owner/login' || location.pathname === '/owner/register') {
            if (role === 'admin') {
              navigate('/admin/dashboard');
            } else {
              navigate('/owner/dashboard');
            }
          }
        }
        setIsLoading(false);
      }
    );

    // Fetch initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        showError(error.message);
      } else {
        if (session) {
          const role = await fetchUserRole(session.user.id);
          const userWithRole: UserWithRole = { ...session.user, role };
          setSession(session);
          setUser(userWithRole);
          if (location.pathname === '/owner/login' || location.pathname === '/owner/register') {
            if (role === 'admin') {
              navigate('/admin/dashboard');
            } else {
              navigate('/owner/dashboard');
            }
          }
        } else {
          setSession(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    getInitialSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  return (
    <SessionContext.Provider value={{ session, user, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};