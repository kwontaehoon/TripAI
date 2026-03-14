import { getUserInfo } from "@/service/supabase"

export type CoursesPageProps = {
  userInfo: Awaited<ReturnType<typeof getUserInfo>>
}
