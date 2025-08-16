'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai'; // Jotai 훅 임포트
import { createClient } from '@/service/supabase/client';
import { sessionAtom, userInfoAtom } from '@/store/ai';
import { useUserInfoMutation } from '@/hooks/supabase/dev';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const supabase = createClient();
  // const { mutate: userInfo } = useUserInfoMutation()

  const setSession = useSetAtom(sessionAtom)
  // const setUserInfo = useSetAtom(userInfoAtom)

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);
    // });

    // 인증 상태 변경 이벤트 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)

      // if(newSession){
      //   userInfo(newSession?.user.email, {
      //     onSuccess: (userInfo) => {
      //       setUserInfo(userInfo)
      //     }
      //   })
      // }

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