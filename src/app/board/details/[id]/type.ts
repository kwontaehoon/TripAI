import { getUserInfo } from "@/service/supabase"

export type BoardDetailsPageProps = {
  params: Promise<{ id: number }>
  userInfo: Awaited<ReturnType<typeof getUserInfo>>
}
