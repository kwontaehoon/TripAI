'use client'

import MainPage from '@/app/main/page'
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