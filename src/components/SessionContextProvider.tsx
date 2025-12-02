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
      console.log("SessionContextProvider: fetchUserRole - Fetching role for user ID:", userId);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role:roles(name)')
          .eq('id', userId)
          .single();

        console.log("SessionContextProvider: fetchUserRole - Supabase role fetch result - data:", data, "error:", error);

        if (error) {
          console.error("SessionContextProvider: fetchUserRole - Error fetching user role:", error.message);
          return undefined;
        }
        const fetchedRoleName = data?.role?.name;
        console.log("SessionContextProvider: fetchUserRole - Fetched role name:", fetchedRoleName);
        return fetchedRoleName;
      } catch (e: any) {
        console.error("SessionContextProvider: fetchUserRole - Unexpected error during role fetch:", e.message);
        return undefined;
      }
    };

    const handleSessionChange = async (event: string, currentSession: Session | null) => {
      console.log("SessionContextProvider: handleSessionChange - onAuthStateChange event:", event, "session:", currentSession);
      setIsLoading(true); // Set loading true at the start of any auth state change
      try {
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          console.log("SessionContextProvider: handleSessionChange - User SIGNED_OUT.");
          // Redirect to login if trying to access a protected route after sign out
          if (location.pathname.startsWith('/owner/dashboard') || location.pathname.startsWith('/admin/dashboard')) {
            console.log("SessionContextProvider: handleSessionChange - Redirecting to /owner/login after sign out from protected route.");
            navigate('/owner/login', { replace: true }); // Or a generic login page
          }
        } else if (currentSession) {
          console.log("SessionContextProvider: handleSessionChange - User SIGNED_IN or session available.");
          const role = await fetchUserRole(currentSession.user.id);
          const userWithRole: UserWithRole = { ...currentSession.user, role };
          setSession(currentSession);
          setUser(userWithRole);
          console.log("SessionContextProvider: handleSessionChange - User authenticated and role set:", userWithRole);

          // Redirect authenticated users from login/register pages to their dashboard
          const adminLoginPath = '/admin';
          const ownerLoginPath = '/owner/login';
          const ownerRegisterPath = '/owner/register';

          console.log(`SessionContextProvider: handleSessionChange - Current path: ${location.pathname}`);
          if (location.pathname === adminLoginPath || location.pathname === ownerLoginPath || location.pathname === ownerRegisterPath) {
            console.log(`SessionContextProvider: handleSessionChange - Attempting redirection from ${location.pathname}. User role: ${role}`);
            if (role === 'admin') {
              console.log('SessionContextProvider: handleSessionChange - Navigating to /admin/dashboard');
              navigate('/admin/dashboard', { replace: true });
            } else if (role === 'owner') {
              console.log('SessionContextProvider: handleSessionChange - Navigating to /owner/dashboard');
              navigate('/owner/dashboard', { replace: true });
            } else {
              console.log('SessionContextProvider: handleSessionChange - User has no specific role or an unexpected role, not redirecting from login/register page.');
              // If user is logged in but has no specific role, redirect to home or a default page
              navigate('/', { replace: true });
            }
          } else {
            console.log('SessionContextProvider: handleSessionChange - Not on a login/register page, no automatic redirection needed here.');
          }
        } else {
          console.log("SessionContextProvider: handleSessionChange - No current session found.");
          setSession(null);
          setUser(null);
        }
      } catch (e: any) {
        console.error("SessionContextProvider: handleSessionChange - Error in handleSessionChange:", e.message);
        showError("Erreur lors de la gestion de la session: " + e.message);
      } finally {
        setIsLoading(false); // Always set loading false
        console.log("SessionContextProvider: handleSessionChange - finished, setIsLoading(false)");
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(handleSessionChange);

    // Fetch initial session
    const getInitialSession = async () => {
      console.log("SessionContextProvider: getInitialSession - Fetching initial session.");
      setIsLoading(true); // Ensure loading is true during initial fetch
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("SessionContextProvider: getInitialSession - Error fetching initial session:", error.message);
          showError(error.message);
        } else {
          if (initialSession) {
            console.log("SessionContextProvider: getInitialSession - Initial session found.");
            const role = await fetchUserRole(initialSession.user.id);
            const userWithRole: UserWithRole = { ...initialSession.user, role };
            setSession(initialSession);
            setUser(userWithRole);
            console.log("SessionContextProvider: getInitialSession - Initial session user and role set:", userWithRole);

            const adminLoginPath = '/admin';
            const ownerLoginPath = '/owner/login';
            const ownerRegisterPath = '/owner/register';

            console.log(`SessionContextProvider: getInitialSession - Current path for initial session: ${location.pathname}`);
            if (location.pathname === adminLoginPath || location.pathname === ownerLoginPath || location.pathname === ownerRegisterPath) {
              console.log(`SessionContextProvider: getInitialSession - Attempting initial redirection from ${location.pathname}. User role: ${role}`);
              if (role === 'admin') {
                console.log('SessionContextProvider: getInitialSession - Initial Navigating to /admin/dashboard');
                navigate('/admin/dashboard', { replace: true });
              } else if (role === 'owner') {
                console.log('SessionContextProvider: getInitialSession - Initial Navigating to /owner/dashboard');
                navigate('/owner/dashboard', { replace: true });
              } else {
                console.log('SessionContextProvider: getInitialSession - Initial: User has no specific role or an unexpected role, not redirecting from login/register page.');
                // If user is logged in but has no specific role, redirect to home or a default page
                navigate('/', { replace: true });
              }
            } else {
              console.log('SessionContextProvider: getInitialSession - Initial: Not on a login/register page, no automatic redirection needed here.');
            }
          } else {
            console.log("SessionContextProvider: getInitialSession - No initial session found.");
            setSession(null);
            setUser(null);
          }
        }
      } catch (e: any) {
        console.error("SessionContextProvider: getInitialSession - Error in getInitialSession:", e.message);
        showError("Erreur lors de la récupération de la session initiale: " + e.message);
      } finally {
        setIsLoading(false); // Always set loading false
        console.log("SessionContextProvider: getInitialSession - Initial session fetch finished, setIsLoading(false)");
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