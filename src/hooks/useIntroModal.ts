"use client"

import { introModalAtom } from '@/store/ai'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

export const useIntroModal = () => {
  const setIntroModal = useSetAtom(introModalAtom)

  useEffect(() => {
    const timer = setTimeout(() => {
      const lastShown = localStorage.getItem("tripai-intro-last-shown")
      const now = new Date().getTime()
      const oneDay = 24 * 60 * 60 * 1000

      if (!lastShown || now - parseInt(lastShown) > oneDay) {
        setTimeout(() => {
          setIntroModal(true)
        }, 500)
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [])
}
