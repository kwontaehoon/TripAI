import { getUserInfo } from "@/service/supabase"

export type CoursesDetailsPageProps = {
  params: Promise<{ id: number }>
  userInfo: Awaited<ReturnType<typeof getUserInfo>>
}
