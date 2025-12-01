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
    console.log("SessionContextProvider useEffect: Initializing auth listener.");

    const fetchUserRole = async (userId: string) => {
      console.log("SessionContextProvider: Fetching role for user ID:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('role:roles(name)')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("SessionContextProvider: Error fetching user role:", error.message);
        return undefined;
      }
      console.log("SessionContextProvider: Fetched role data:", data);
      return data?.role?.name;
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("SessionContextProvider: onAuthStateChange event:", event, "session:", currentSession);
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          console.log("SessionContextProvider: User SIGNED_OUT.");
          // Redirect to login if trying to access a protected route after sign out
          if (location.pathname.startsWith('/owner/dashboard') || location.pathname.startsWith('/admin/dashboard')) {
            console.log("SessionContextProvider: Redirecting to /owner/login after sign out from protected route.");
            navigate('/owner/login', { replace: true }); // Or a generic login page
          }
        } else if (currentSession) {
          console.log("SessionContextProvider: User SIGNED_IN or session available.");
          const role = await fetchUserRole(currentSession.user.id);
          const userWithRole: UserWithRole = { ...currentSession.user, role };
          setSession(currentSession);
          setUser(userWithRole);
          console.log("SessionContextProvider: User authenticated and role set:", userWithRole);

          // Redirect authenticated users from login/register pages to their dashboard
          const adminLoginPath = '/admin';
          const ownerLoginPath = '/owner/login';
          const ownerRegisterPath = '/owner/register';

          if (location.pathname === adminLoginPath || location.pathname === ownerLoginPath || location.pathname === ownerRegisterPath) {
            console.log(`SessionContextProvider: Attempting redirection from ${location.pathname}. User role: ${role}`);
            if (role === 'admin') {
              navigate('/admin/dashboard', { replace: true });
              console.log('SessionContextProvider: Redirected to /admin/dashboard');
            } else if (role === 'owner') {
              navigate('/owner/dashboard', { replace: true });
              console.log('SessionContextProvider: Redirected to /owner/dashboard');
            } else {
              console.log('SessionContextProvider: User has no specific role or an unexpected role, not redirecting from login/register page.');
            }
          }
        }
        setIsLoading(false);
        console.log("SessionContextProvider: setIsLoading(false)");
      }
    );

    // Fetch initial session
    const getInitialSession = async () => {
      console.log("SessionContextProvider: Fetching initial session.");
      const { data: { session: initialSession }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("SessionContextProvider: Error fetching initial session:", error.message);
        showError(error.message);
      } else {
        if (initialSession) {
          console.log("SessionContextProvider: Initial session found.");
          const role = await fetchUserRole(initialSession.user.id);
          const userWithRole: UserWithRole = { ...initialSession.user, role };
          setSession(initialSession);
          setUser(userWithRole);
          console.log("SessionContextProvider: Initial session user and role set:", userWithRole);

          const adminLoginPath = '/admin';
          const ownerLoginPath = '/owner/login';
          const ownerRegisterPath = '/owner/register';

          if (location.pathname === adminLoginPath || location.pathname === ownerLoginPath || location.pathname === ownerRegisterPath) {
            console.log(`SessionContextProvider: Attempting initial redirection from ${location.pathname}. User role: ${role}`);
            if (role === 'admin') {
              navigate('/admin/dashboard', { replace: true });
              console.log('SessionContextProvider: Initial Redirected to /admin/dashboard');
            } else if (role === 'owner') {
              navigate('/owner/dashboard', { replace: true });
              console.log('SessionContextProvider: Initial Redirected to /owner/dashboard');
            } else {
              console.log('SessionContextProvider: Initial: User has no specific role or an unexpected role, not redirecting from login/register page.');
            }
          }
        } else {
          console.log("SessionContextProvider: No initial session found.");
          setSession(null);
          setUser(null);
        }
      }
      setIsLoading(false);
      console.log("SessionContextProvider: Initial session fetch finished, setIsLoading(false)");
    };

    getInitialSession();

    return () => {
      console.log("SessionContextProvider: Unsubscribing auth listener.");
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