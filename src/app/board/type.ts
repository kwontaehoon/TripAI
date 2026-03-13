import { getUserInfo } from "@/service/supabase"

export type BoardPageProps = {
  params: Record<string, string>
  userInfo: Awaited<ReturnType<typeof getUserInfo>>
}
