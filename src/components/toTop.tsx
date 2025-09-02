"use client"
import React, { useEffect, useState } from "react"
import { ChevronUp } from 'lucide-react'

export const ToTop = () => {
  const [scrollY, setScrollY] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('wheel', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  if(scrollY >= 500)
  return (
    <div
      className="fixed right-5 lg:right-20 bottom-12 w-8 h-8 rounded-full w-h-center bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
      onClick={scrollToTop}
    >
    <ChevronUp />
    </div>
  )
}
