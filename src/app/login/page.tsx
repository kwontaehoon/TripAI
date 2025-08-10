import React from 'react'
import Client from './client'
import { createClient } from '@/service/supabase/server'

const page = async() => {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <Client initialSession={session}/>
  )
}

export default page