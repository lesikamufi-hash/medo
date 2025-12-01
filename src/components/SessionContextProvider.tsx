"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { showLoading, dismissToast, showError } from '@/utils/toast';

interface SessionContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
          setSession(currentSession);
          setUser(currentSession.user);
          // Redirect authenticated users from login/register pages to their dashboard
          if (location.pathname === '/owner/login' || location.pathname === '/owner/register') {
            navigate('/owner/dashboard');
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
        setSession(session);
        setUser(session?.user || null);
        if (session && (location.pathname === '/owner/login' || location.pathname === '/owner/register')) {
          navigate('/owner/dashboard');
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