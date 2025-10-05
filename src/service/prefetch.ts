import { QueryClient } from "@tanstack/react-query"
import {
  getBoardDetails,
  getBoards,
  getBoardsInfinite,
  getCourseDetails,
  getCourses,
  getCoursesAndBoards,
  getCoursesAndBoardsGallery,
  getCoursesInfinite,
  getPopularLocation,
} from "./supabase"

const TEST_QUERY_KEY = {
  popularLocation: ["popularLocation"],
  courses: ["courses"],
  coursesInfinite: ["courses", "infinite"],
  courseDetails: ["courseDetails"],
  boards: ["boards"],
  boardsInfinite: ["boards", "infinite"],
  boardDetails: ["boardDetails"],
  coursesAndBoards: ["coursesAndBoards"],
  popularSearch: ["popularSearch"],
  coursesAndBoardsGallery: ["coursesAndBoardsGallery"]
}

// popular location
export const prefetchPopularLocation = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: TEST_QUERY_KEY.popularLocation,
    queryFn: getPopularLocation,
  })
}

// courses prefetch
export const prefetchCourses = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: TEST_QUERY_KEY.courses,
    queryFn: getCourses,
  })
}

// courses infinite prefetch
export const prefetchCoursesInfinite = async (
  queryClient: QueryClient,
  pageParam: string | null,
) => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: TEST_QUERY_KEY.coursesInfinite,
    queryFn: async () => {
      return getCoursesInfinite({ pageParam })
    },
    initialPageParam: pageParam,
  })
}

// courseDetails prefetch 초기 4개
export const prefetchCourseDetails = async (
  queryClient: QueryClient,
  params: number,
) => {
  await queryClient.prefetchQuery({
    queryKey: [TEST_QUERY_KEY.courseDetails, params],
    queryFn: () => getCourseDetails(params),
  })
}

// boards prefetch
export const prefetchBoards = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: TEST_QUERY_KEY.boards,
    queryFn: getBoards,
  })
}

// boards infinite prefetch
export const prefetchBoardsInfinite = async (
  queryClient: QueryClient,
  pageParam: string | null,
) => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: TEST_QUERY_KEY.boardsInfinite,
    queryFn: async () => {
      return getBoardsInfinite({ pageParam })
    },
    initialPageParam: pageParam,
  })
}

// boardDetails prefetch 초기 3개
export const prefetchBoardDetails = async (
  queryClient: QueryClient,
  params: number,
) => {
  await queryClient.prefetchQuery({
    queryKey: [TEST_QUERY_KEY.boardDetails, params],
    queryFn: () => getBoardDetails(params),
  })
}

// coursesAndBoards prefetch
export const prefetchCoursesAndBoards = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: TEST_QUERY_KEY.coursesAndBoards,
    queryFn: getCoursesAndBoards,
  })
}

// coursesAndBoardsGallery prefetch
export const prefetchCoursesAndBoardsGallery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: TEST_QUERY_KEY.coursesAndBoardsGallery,
    queryFn: getCoursesAndBoardsGallery,
  })
}