import { useQuery } from "@tanstack/react-query";
import { getCourses, getCourseDetails, getBoards, getBoardDetails, getCoursesAndBoards } from "@/service/supabase";

const TEST_QUERY_KEY = {
    courses: ["courses"],
    courseDetails: ["courseDetails"],
    boards: ["boards"],
    boardDetails: ["boardDetails"],
    coursesAndBoards: ["coursesAndBoards"]
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
        queryKey: TEST_QUERY_KEY.courseDetails,
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
        queryKey: TEST_QUERY_KEY.boardDetails,
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