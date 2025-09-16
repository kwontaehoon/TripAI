import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import {
  getCourses,
  getCoursesInfinite,
  getCourseDetails,
  getBoards,
  getBoardDetails,
  getCoursesAndBoards,
  getPopularSearch,
  postBoardCreate,
  postEmailCheck,
  postSignup,
  getUserInfo,
  postLike,
  postCommentRegister,
  postCommentDelete,
  getComments,
  postCommentReplyRegister,
  postCommentReplyDelete,
  postCommentLike,
  postCommentReplyLike,
  getBoardsInfinite,
  postMypageEdit,
  postMypageUpdateProfile,
} from "@/service/supabase"
import { uploadMultipleImages } from "@/service/supabase/storage"
import { getGeminiAi } from "@/service/gemini"

const TEST_QUERY_KEY = {
  userInfo: ["userInfo"],
  courses: ["courses"],
  coursesInfinite: ["courses", "infinite"],
  courseDetails: ["courseDetails"],
  boards: ["boards"],
  boardsInfinite: ["boards", "infinite"],
  boardDetails: ["boardDetails"],
  coursesAndBoards: ["coursesAndBoards"],
  comments: ["comments"],
  popularSearch: ["popularSearch"],
}

// user 정보 가져오기
export const useUserInfoQuery = (params) => {
  const queryOptions = {
    queryKey: TEST_QUERY_KEY.userInfo,
    queryFn: async () => {
      const data = await getUserInfo(params)
      return data
    },
  }

  return useQuery(queryOptions)
}

// user 정보 요청하기
export const useUserInfoMutation = () => {
  const mutationOptions = {
    mutationFn: async (params) => {
      const results = await getUserInfo(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// user 이메일 확인
export const useEmailCheckMutation = (params) => {
  const mutationOptions = {
    mutationFn: async () => {
      const results = await postEmailCheck(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// 회원가입
export const useSignupMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const results = await postSignup(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// mypage update profile
export const useMypageUpdateProfileMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const results = await postMypageUpdateProfile(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// mypage edit
export const useMypageEditMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const results = await postMypageEdit(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// courses
export const useCoursesQuery = () => {
  const queryOptions = {
    queryKey: TEST_QUERY_KEY.courses,
    queryFn: async () => {
      const data = await getCourses()
      return data
    },
  }

  return useQuery(queryOptions)
}

type GetCoursesResponse = {
  courses: object[] | null
  nextCursor: string | null
}

// 무한스크롤 courses
export const useCoursesInfiniteQuery = () => {
  return useInfiniteQuery<
    GetCoursesResponse,
    Error,
    (object | null)[],
    string[],
    string | null
  >({
    queryKey: TEST_QUERY_KEY.coursesInfinite,
    queryFn: async ({ pageParam }) => await getCoursesInfinite({ pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.courses)
    },
  })
}

// course_details
export const useCourseDetailsQuery = (params: number) => {
  const queryOptions = {
    queryKey: [TEST_QUERY_KEY.courseDetails, params],
    queryFn: async () => {
      const data = await getCourseDetails(params)
      return data
    },
  }
  return useQuery(queryOptions)
}

// boards
export const useBoardsQuery = () => {
  const queryOptions = {
    queryKey: TEST_QUERY_KEY.boards,
    queryFn: async () => {
      const data = await getBoards()
      return data
    },
  }

  return useQuery(queryOptions)
}

type GetBoardssResponse = {
  boards: object[] | null
  nextCursor: string | null
}

// 무한스크롤 boards
export const useBoardsInfiniteQuery = () => {
  return useInfiniteQuery<
    GetBoardssResponse,
    Error,
    (object | null)[],
    string[],
    string | null
  >({
    queryKey: TEST_QUERY_KEY.boardsInfinite,
    queryFn: async ({ pageParam }) => await getBoardsInfinite({ pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.boards)
    },
  })
}

// board_details
export const useBoardDetailssQuery = (params: number) => {
  const queryOptions = {
    queryKey: [TEST_QUERY_KEY.boardDetails, params],
    queryFn: async () => {
      const data = await getBoardDetails(params)
      return data
    },
  }

  return useQuery(queryOptions)
}

// courses and boards
export const useCoursesAndBoardsQuery = () => {
  const queryOptions = {
    queryKey: TEST_QUERY_KEY.coursesAndBoards,
    queryFn: async () => {
      return await getCoursesAndBoards()
    },
  }

  return useQuery(queryOptions)
}

// 게시글 좋아요
export const useLikeMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const results = await postLike(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// 댓글 좋아요
export const useCommentLikeMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const results = await postCommentLike(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// 댓글 답글 좋아요
export const useCommentReplyLikeMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const results = await postCommentReplyLike(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// 댓글 리스트
export const useCommentsQuery = (params) => {
  const targetId = params.board_id || params.course_id
  const targetIdColumn = params.board_id ? "board_id" : "course_id"
  const queryOptions = {
    queryKey: [TEST_QUERY_KEY.comments, targetId + targetIdColumn],
    queryFn: async () => {
      const data = await getComments(params)
      return data
    },
  }

  return useQuery(queryOptions)
}

// 댓글 등록
export const useCommentRegisterMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const results = await postCommentRegister(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// 댓글 답글 등록
export const useCommentReplyRegisterMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const results = await postCommentReplyRegister(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// 댓글 삭제
export const useCommentDeleteMutation = () => {
  const mutationOptions = {
    mutationFn: async (id: number) => {
      const results = await postCommentDelete(id)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// 댓글 답글 삭제
export const useCommentReplyDeleteMutation = () => {
  const mutationOptions = {
    mutationFn: async (id: number) => {
      const results = await postCommentReplyDelete(id)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// 인기 검색어
export const usePopularSearchQuery = () => {
  const queryOptions = {
    queryKey: TEST_QUERY_KEY.popularSearch,
    queryFn: async () => {
      const data = await getPopularSearch()
      return data
    },
  }

  return useQuery(queryOptions)
}

// board 생성
export const useBoardCreateMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const { success, error, newBoardId } = await postBoardCreate(params)
      return { success, error, newBoardId }
    },
  }
  return useMutation(mutationOptions)
}

// uploadImages to bucket
export const useUploadImagesToBucketMutation = () => {
  const mutationOptions = {
    mutationFn: async (params) => {
      const results = await uploadMultipleImages(params)
      return results
    },
  }
  return useMutation(mutationOptions)
}

// ai-recommend 생성
export const useAiRecommendMutation = () => {
  const mutationOptions = {
    mutationFn: async (params: object) => {
      const { data } = await getGeminiAi(params)
      return data
    },
  }
  return useMutation(mutationOptions)
}
