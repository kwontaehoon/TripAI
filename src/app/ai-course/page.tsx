import { getUserInfo } from "@/service/supabase"
import { createClient } from "@/service/supabase/server"
import React from "react"
import Client from "./client"

const server = async () => {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 비로그인시 useInfo는 null로 처리
  const userInfo = !session ? null : await getUserInfo(session?.user.email)

  return <Client userInfo={userInfo} />
}

export default server
