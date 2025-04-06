import { clientAxios, aiAxios, googlePlaceTextAxios, googlePlaceNearbyAxios, googlePlaceDetailsAxios, googlePlaceImagesAxios, nextjsAxios } from ".";

const ACCOUNT_URL = {
    nextjs: "",
    info: "/api/banner/list",
    pick: "/api/pick/list"
}

const GOOGLE_PLACE_URL = {
    ai: "",
    text: "",
    nearby: "",
    details: "",
    images: ""
}

// test
export const getTest = () => clientAxios.get(ACCOUNT_URL.info);

// test2
export const getTest2 = () => clientAxios.get(ACCOUNT_URL.pick);

// nextjs test
export  const getNextJS = () => nextjsAxios.get(ACCOUNT_URL.nextjs);

// gemini ai
export const getGeminiAi = (params: object) => aiAxios.post(GOOGLE_PLACE_URL.ai, params);

// googlePlace text
export const getGooglePlaceText = (params: object) => googlePlaceTextAxios.post(GOOGLE_PLACE_URL.text, {
    textQuery: params
});

// googlePlace nearby
export const getGooglePlaceNearby = (params: object) => googlePlaceNearbyAxios.post(GOOGLE_PLACE_URL.nearby, params);

// googlePlace details
export const getGooglePlaceDetails = (params: string) => googlePlaceDetailsAxios.get(`${GOOGLE_PLACE_URL.details}${params}`);

// googlePlace image
export const getGooglePlaceImages = (params: string) => googlePlaceImagesAxios.get(`${GOOGLE_PLACE_URL.images}${params}/media`, {
    params: {
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        maxWidthPx: 400,
        maxHeightPx: 400
    }
});