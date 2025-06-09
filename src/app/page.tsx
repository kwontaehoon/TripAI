'use client'

import MainPage from '@/app/main/page'
import { useAtom } from "jotai"
import { useEffect } from "react"
import { modalUiStateAtom } from '@/store/ai'
import { SessionProvider } from 'next-auth/react'

const page = () => {

  const [aiImodalUiStatenput, _] = useAtom(modalUiStateAtom);

  const shouldDisableScroll = Object.values(aiImodalUiStatenput).some((state) => state);

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  useEffect(() => {
    if (shouldDisableScroll) {
      const scrollbarWidth = getScrollbarWidth();
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = "0px";
    };
  }, [shouldDisableScroll]);

  return (
    <div>
      <SessionProvider>
      <MainPage />
      </SessionProvider>
    </div>
  )
}

export default page