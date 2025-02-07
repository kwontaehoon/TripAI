import { useQuery, useMutation } from "@tanstack/react-query";
import { getTest, getGeminiAi, getGooglePlaceText, getGooglePlaceNearby } from "@/service/test"

const TEST_QUERY_KEY = {
    test: ["test"],
    geminiAi: ["geminiAi"],
    googlePlaceNearby: ["googlePlaceNearby"],
    googlePlaceTextSearch: ["googlePlaceTextSearch"],
};


// test
export const useTestQuery = () => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.test,
        queryFn: async () => {
            const { data } = await getTest();
            return data;
        },
    };

    return useQuery(queryOptions);
};

// gemini ai

// googlePlace text
export const useGooglePlaceTextMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            console.log("params: ", params);
            const { data } = await getGooglePlaceText(params);
            return data;
        },
    };
    return useMutation(mutationOptions);
};



// googlePlace nearby
export const useGooglePlaceNearbyMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            const { data } = await getGooglePlaceNearby(params);
            return data;
        },
    };
    return useMutation(mutationOptions);
};
