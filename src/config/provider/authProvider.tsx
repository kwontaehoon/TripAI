'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/service/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<{ session: Session | null; user: User | null }>({
  session: null,
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (_event === "SIGNED_IN") {
        console.log("SIGNED_IN")
        // router.push("/")
      }
      if(_event === "PASSWORD_RECOVERY"){
        console.log("PASSWORD_RECOVERY")
      }
      
      if (_event === "SIGNED_OUT") {
        router.refresh()
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
};