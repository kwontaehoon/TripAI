import { Camera, Mountain } from "lucide-react"
import LeftPanel from "./left/leftPanel"
import RightPanel from "./right/rightPanel"
import {
  getBoards,
  getBoardsInfinite,
  getCourses,
  getCoursesAndBoardsGallery,
  getCoursesInfinite,
  getPopularLocation,
} from "@/service/supabase"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { Hydration } from "../Hydration"
import {
  prefetchBoards,
  prefetchBoardsInfinite,
  prefetchCourses,
  prefetchCoursesAndBoards,
  prefetchCoursesAndBoardsGallery,
  prefetchCoursesInfinite,
  prefetchPopularLocation,
} from "@/service/prefetch"
export const revalidate = 3600

const Page = async () => {
  const queryClient = new QueryClient()

  // prefech
  await Promise.all([
    prefetchPopularLocation(queryClient),
    prefetchCourses(queryClient),
    prefetchCoursesInfinite(queryClient, null),
    prefetchBoards(queryClient),
    prefetchBoardsInfinite(queryClient, null),
    prefetchCoursesAndBoardsGallery(queryClient),
  ])

  return (
    <Hydration state={dehydrate(queryClient)}>
      <div
        className="
        bg-#f8fafc
        justify-center
        px-4 lg:px-0 py-28 mb-4 space-x-0
        lg:flex lg:mb-12 lg:space-x-12"
      >
        <LeftPanel />
        <RightPanel />

        {/* Floating Elements */}
        <div className="absolute hidden 2xl:block top-32 left-20 animate-bounce">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <Camera className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="absolute hidden 2xl:block top-32 right-20 animate-bounce delay-1000">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <Mountain className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>
    </Hydration>
  )
}

export default Page
