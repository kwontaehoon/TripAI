"use client"

import { introModalAtom } from '@/store/ai'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'

const Intro = () => {

    const [_, setIntroModal] = useAtom(introModalAtom)

    // 페이지 로딩 시뮬레이션 및 Trip AI 소개 모달 표시 로직
  useEffect(() => {
    const timer = setTimeout(() => {
      // 로딩 완료 후 Trip AI 소개 모달 표시 여부 확인
      const lastShown = localStorage.getItem("tripai-intro-last-shown")
      const now = new Date().getTime()
      const oneDay = 24 * 60 * 60 * 1000 // 24시간을 밀리초로 변환

      if (!lastShown || now - parseInt(lastShown) > oneDay) {
        // 처음 방문이거나 하루가 지났으면 모달 표시
        setTimeout(() => {
          setIntroModal(true)
        }, 500) // 페이지 로딩 후 0.5초 뒤에 모달 표시
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div></div>
  )
}

export default Intro