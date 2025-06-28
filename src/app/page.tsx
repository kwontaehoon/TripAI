'use client'

import MainPage from '@/app/main/page'
import { useAtom } from "jotai"
import { useEffect } from "react"
import { modalUiStateAtom } from '@/store/ai'
import { SessionProvider } from 'next-auth/react'

const page = () => {

  return (
    <div>
      <SessionProvider>
      <MainPage />
      </SessionProvider>
    </div>
  )
}

export default page