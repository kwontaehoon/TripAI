import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getCourses, getCourseDetails, getBoards, getBoardDetails, getCoursesAndBoards, getPopularSearch, postBoardCreate, postEmailCheck, postSignup, getUserInfo, postLike, postComment, postCommentRegister, postCommentDelete, getComments, postCommentReplyRegister, postCommentReplyDelete } from "@/service/supabase";
import { uploadMultipleImages } from "@/service/supabase/storage";
import { getGeminiAi } from "@/service/gemini";

const TEST_QUERY_KEY = {
    userInfo: ["userInfo"],
    courses: ["courses"],
    courseDetails: ["courseDetails"],
    boards: ["boards"],
    boardDetails: ["boardDetails"],
    coursesAndBoards: ["coursesAndBoards"],
    comments: ["comments"],
    popularSearch: ["popularSearch"]
}

// user 정보 가져오기
export const useUserInfoQuery = (params) => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.userInfo,
        queryFn: async () => {
            const data = await getUserInfo(params);
            return data;
        },
    };

    return useQuery(queryOptions);
};

// user 정보 요청하기
export const useUserInfoMutation = () => {
    const mutationOptions = {
        mutationFn: async (params) => {
            const results = await getUserInfo(params);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// user 이메일 확인
export const useEmailCheckMutation = (params) => {
    const mutationOptions = {
        mutationFn: async () => {
            const results = await postEmailCheck(params);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// 회원가입
export const useSignupMutation = (params) => {
    const mutationOptions = {
        mutationFn: async () => {
            const results = await postSignup(params);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// courses
export const useCoursesQuery = () => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.courses,
        queryFn: async () => {
            const data = await getCourses();
            return data;
        },
    };

    return useQuery(queryOptions);
};

// course_details
export const useCourseDetailsQuery = (params: number) => {
    const queryOptions = {
        queryKey: [TEST_QUERY_KEY.courseDetails, params],
        queryFn: async () => {
            const data = await getCourseDetails(params);
            return data;
        }
    }
    return useQuery(queryOptions);
}

// boards
export const useBoardsQuery = () => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.boards,
        queryFn: async () => {
            const data = await getBoards();
            return data;
        },
    };

    return useQuery(queryOptions);
};


// board_details
export const useBoardDetailssQuery = (params: number) => {
    const queryOptions = {
        queryKey: [TEST_QUERY_KEY.boardDetails, params],
        queryFn: async () => {
            const data = await getBoardDetails(params);
            return data;
        },
    };

    return useQuery(queryOptions);
};

// courses and boards
export const useCoursesAndBoardsQuery = () => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.coursesAndBoards,
        queryFn: async () => {
            return await getCoursesAndBoards();
        },
    };

    return useQuery(queryOptions);
};

// 좋아요
export const useLikeMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            const results = await postLike(params);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// 댓글 리스트
export const useCommentsQuery = (params) => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.comments,
        queryFn: async () => {
            const data = await getComments(params);
            return data;
        },
    };

    return useQuery(queryOptions);
};

// 댓글 등록
export const useCommentRegisterMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            const results = await postCommentRegister(params);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// 댓글 답글 등록
export const useCommentReplyRegisterMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            const results = await postCommentReplyRegister(params);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// 댓글 삭제
export const useCommentDeleteMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            const results = await postCommentDelete(params);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// 댓글 답글 삭제
export const useCommentReplyDeleteMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            const results = await postCommentReplyDelete(params);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// 인기 검색어
export const usePopularSearchQuery = () => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.popularSearch,
        queryFn: async () => {
            const data = await getPopularSearch();
            return data;
        },
    };

    return useQuery(queryOptions);
};

// board 생성
export const useBoardCreateMutation = (params: object) => {
    const mutationOptions = {
        mutationFn: async () => {
            const { success, error, newBoardId } = await postBoardCreate(params);
            return { success, error, newBoardId };
        },
    };
    return useMutation(mutationOptions);
};

// uploadImages to bucket
export const useUploadImagesToBucketMutation = (files: FileList | File[]) => {
    const mutationOptions = {
        mutationFn: async () => {
            const results = await uploadMultipleImages(files);
            return results;
        },
    };
    return useMutation(mutationOptions);
};

// ai-recommend 생성
export const useAiRecommendMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            const { data } = await getGeminiAi(params);
            console.log("data: ", data)
            return data;
        },
    };
    return useMutation(mutationOptions);
};