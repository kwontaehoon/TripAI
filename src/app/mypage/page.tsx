import React from 'react'
import Client from './client'
import { createClient } from '@/service/supabase/server'
import { getUserInfo } from '@/service/supabase'

const page = async() => {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

   const userInfo = !session ? null : await getUserInfo(session?.user.email)

  return (
    <Client userInfo={userInfo}/>
  )
}

export default page