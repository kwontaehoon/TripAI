import { getUserInfo } from "@/service/supabase"
import { createClient } from "@/service/supabase/server"

export async function getServerUserInfo() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return !session ? null : await getUserInfo(session?.user.email)
}
