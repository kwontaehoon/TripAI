// components/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai'; // Jotai 훅 임포트
import { createClient } from '@/service/supabase/client';
import { sessionAtom } from '@/store/ai';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const supabase = createClient();

  // Jotai의 useSetAtom을 사용하여 상태를 업데이트합니다.
  const setSession = useSetAtom(sessionAtom);

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 인증 상태 변경 이벤트 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)

      if (_event === 'SIGNED_IN') {
        console.log('SIGNED_IN');
        // router.push("/")
      }
      if (_event === 'PASSWORD_RECOVERY') {
        console.log('PASSWORD_RECOVERY');
      }
      if (_event === 'SIGNED_OUT') {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe()
    };
  }, [])

  return <>{children}</>
};