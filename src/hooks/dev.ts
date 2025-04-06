import { useQuery, useMutation, useQueries } from "@tanstack/react-query";
import { getTest, getGeminiAi, getGooglePlaceText, getGooglePlaceNearby, getGooglePlaceDetails, getGooglePlaceImages, getNextJS, getTest2 } from "@/service/dev"

const TEST_QUERY_KEY = {
    test: ["test"],
    nextjs: ["nextjs"],
    geminiAi: ["geminiAi"],
    googlePlaceNearby: ["googlePlaceNearby"],
    googlePlaceTextSearch: ["googlePlaceTextSearch"],
    googlePlaceDetails: ["googlePlaceDetails"],
    googlePlaceImage: ["googlePlaceImage"],
    googlePlaceCombine: ["googlePlaceCombine"]
}

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

// nextjs
export const useNextJSQuery = () => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.nextjs,
        queryFn: async () => {
            const { data } = await getNextJS();
            return data;
        },
    };

    return useQuery(queryOptions);
};

// gemini ai
export const useGeminiAiMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            const { data } = await getGeminiAi(params);
            return data;
        },
    };
    return useMutation(mutationOptions);
};

// googlePlace text
export const useGooglePlaceTextMutation = () => {
    const mutationOptions = {
        mutationFn: async (params: object) => {
            const { data } = await getGooglePlaceText(params);
            return data.places[0];
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

// googlePlace details
export const useGooglePlaceDetailsQuery = (params: string) => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.googlePlaceDetails,
        queryFn: async () => {
            const { data } = await getGooglePlaceDetails(params);
            return data;
        },
    };

    return useQuery(queryOptions);
}

// googlePlace details queries
export const useGooglePlaceDetailsQueries = (placeIds: string[]) => {
    return useQueries({
      queries: placeIds.map((id) => ({
        queryKey: ['googlePlaceDetails', id],
        queryFn: () => getGooglePlaceDetails(id),
        enabled: !!id,
      }))
    })
}

// googlePlace images
export const useGooglePlaceImageQuery = (id: string) => {
    const queryOptions = {
        queryKey: TEST_QUERY_KEY.googlePlaceImage,
        queryFn: async () => {
            const { data } = await getGooglePlaceImages(id);
            return data;
        },
    };

    return useQuery(queryOptions);
}

// googlePlace images queries
export const useGooglePlaceImagesQueries = (placeIds: string[]) => {
    return useQueries({
      queries: placeIds.map((id) => ({
        queryKey: ['googlePlaceImages', id],
        queryFn: () => getGooglePlaceImages(id),
        enabled: !!id,
      }))
    })
}

// googlePlace 여러 API 한번에 호출
export const useGooglePlaceCombineQuery = () => {
    const placeNames = ["서울역"];

    const queryOptions = {
        queries: placeNames.map((x) => ({
            queryKey: [TEST_QUERY_KEY.googlePlaceCombine, x],
            queryFn: async () => {
                const data = await getTest();
                const data2 = await getTest2();
                return { data, data2 }
            },
        }))
    };

    return useQueries(queryOptions);
}