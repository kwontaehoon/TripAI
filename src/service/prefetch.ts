import { QueryClient } from "@tanstack/react-query";
import { getBoardDetails, getBoards, getCourseDetails, getCourses, getCoursesAndBoards, getPopularSearch } from "./supabase";


const TEST_QUERY_KEY = {
    courses: ["courses"],
    courseDetails: ["courseDetails"],
    boards: ["boards"],
    boardDetails: ["boardDetails"],
    coursesAndBoards: ["coursesAndBoards"],
    popularSearch: ["popularSearch"]
}

// courses prefetch
export const prefetchCourses = async (queryClient: QueryClient) => {
    await queryClient.prefetchQuery({
      queryKey: TEST_QUERY_KEY.courses,
      queryFn: getCourses,
    })
}

// courseDetails prefetch 초기 4개
export const prefetchCourseDetails = async (queryClient: QueryClient, params:number) => {
    await queryClient.prefetchQuery({
      queryKey: [TEST_QUERY_KEY.courseDetails, params],
      queryFn: ()=>getCourseDetails(params),
    })
}

// boards prefetch
export const prefetchBoards = async (queryClient: QueryClient) => {
    await queryClient.prefetchQuery({
      queryKey: TEST_QUERY_KEY.boards,
      queryFn: getBoards,
    })
}

// boardDetails prefetch 초기 3개
export const prefetchBoardDetails = async (queryClient: QueryClient, params:number) => {
    await queryClient.prefetchQuery({
      queryKey: [TEST_QUERY_KEY.boardDetails, params],
      queryFn: ()=>getBoardDetails(params),
    })
}

// coursesAndBoards prefetch
export const prefetchCoursesAndBoards = async (queryClient: QueryClient) => {
    await queryClient.prefetchQuery({
      queryKey: TEST_QUERY_KEY.coursesAndBoards,
      queryFn: getCoursesAndBoards,
    })
}