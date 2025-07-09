import { useMutation, useQuery } from "@tanstack/react-query";
import { getCourses, getCourseDetails, getBoards, getBoardDetails, getCoursesAndBoards, getPopularSearch, postBoardCreate } from "@/service/supabase";
import { uploadMultipleImages } from "@/service/supabase/storage";
import { getGeminiAi } from "@/service/gemini";

const TEST_QUERY_KEY = {
    courses: ["courses"],
    courseDetails: ["courseDetails"],
    boards: ["boards"],
    boardDetails: ["boardDetails"],
    coursesAndBoards: ["coursesAndBoards"],
    popularSearch: ["popularSearch"]
}

// courses
export const useCoursesQuery = () => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.courses,
        queryFn: async () => {
            const { data } = await getCourses();
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
            const { data } = await getCourseDetails(params);
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
            const { data } = await getBoards();
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
            const { data } = await getBoardDetails(params);
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
            const { courses, boards } = await getCoursesAndBoards();
            return [...courses, ...boards];
        },
    };

    return useQuery(queryOptions);
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