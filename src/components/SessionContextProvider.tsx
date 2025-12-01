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
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role:roles(name)')
          .eq('id', userId)
          .single();

        console.log("SessionContextProvider: Supabase role fetch result - data:", data, "error:", error);

        if (error) {
          console.error("SessionContextProvider: Error fetching user role:", error.message);
          return undefined;
        }
        const fetchedRoleName = data?.role?.name;
        console.log("SessionContextProvider: Fetched role name:", fetchedRoleName);
        return fetchedRoleName;
      } catch (e: any) {
        console.error("SessionContextProvider: Unexpected error during role fetch:", e.message);
        return undefined;
      }
    };

    const handleSessionChange = async (event: string, currentSession: Session | null) => {
      console.log("SessionContextProvider: onAuthStateChange event:", event, "session:", currentSession);
      setIsLoading(true); // Set loading true at the start of any auth state change
      try {
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

          console.log(`SessionContextProvider: Current path: ${location.pathname}`);
          if (location.pathname === adminLoginPath || location.pathname === ownerLoginPath || location.pathname === ownerRegisterPath) {
            console.log(`SessionContextProvider: Attempting redirection from ${location.pathname}. User role: ${role}`);
            if (role === 'admin') {
              console.log('SessionContextProvider: Navigating to /admin/dashboard');
              navigate('/admin/dashboard', { replace: true });
            } else if (role === 'owner') {
              console.log('SessionContextProvider: Navigating to /owner/dashboard');
              navigate('/owner/dashboard', { replace: true });
            } else {
              console.log('SessionContextProvider: User has no specific role or an unexpected role, not redirecting from login/register page.');
            }
          } else {
            console.log('SessionContextProvider: Not on a login/register page, no automatic redirection needed here.');
          }
        }
      } catch (e: any) {
        console.error("SessionContextProvider: Error in handleSessionChange:", e.message);
        showError("Erreur lors de la gestion de la session: " + e.message);
      } finally {
        setIsLoading(false); // Always set loading false
        console.log("SessionContextProvider: handleSessionChange finished, setIsLoading(false)");
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(handleSessionChange);

    // Fetch initial session
    const getInitialSession = async () => {
      console.log("SessionContextProvider: Fetching initial session.");
      setIsLoading(true); // Ensure loading is true during initial fetch
      try {
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

            console.log(`SessionContextProvider: Current path for initial session: ${location.pathname}`);
            if (location.pathname === adminLoginPath || location.pathname === ownerLoginPath || location.pathname === ownerRegisterPath) {
              console.log(`SessionContextProvider: Attempting initial redirection from ${location.pathname}. User role: ${role}`);
              if (role === 'admin') {
                console.log('SessionContextProvider: Initial Navigating to /admin/dashboard');
                navigate('/admin/dashboard', { replace: true });
              } else if (role === 'owner') {
                console.log('SessionContextProvider: Initial Navigating to /owner/dashboard');
                navigate('/owner/dashboard', { replace: true });
              } else {
                console.log('SessionContextProvider: Initial: User has no specific role or an unexpected role, not redirecting from login/register page.');
              }
            } else {
              console.log('SessionContextProvider: Initial: Not on a login/register page, no automatic redirection needed here.');
            }
          } else {
            console.log("SessionContextProvider: No initial session found.");
            setSession(null);
            setUser(null);
          }
        }
      } catch (e: any) {
        console.error("SessionContextProvider: Error in getInitialSession:", e.message);
        showError("Erreur lors de la récupération de la session initiale: " + e.message);
      } finally {
        setIsLoading(false); // Always set loading false
        console.log("SessionContextProvider: Initial session fetch finished, setIsLoading(false)");
      }
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