import { getUserInfo } from "@/service/supabase"

export type BoardPageProps = {
  userInfo: Awaited<ReturnType<typeof getUserInfo>>
}
