import { clientAxios, aiAxios, googlePlaceTextAxios, googlePlaceNearbyAxios } from ".";

const ACCOUNT_URL = {
    info: "/api/banner/list"
}

const GOOGLE_PLACE_URL = {
    ai: "",
    text: "",
    nearby: ""
}

// 내 정보
export const getTest = () => clientAxios.get(ACCOUNT_URL.info);

// gemini ai
export const getGeminiAi = (params: object) => aiAxios.post(GOOGLE_PLACE_URL.ai, params);

// googlePlace text
export const getGooglePlaceText = (params: object) => googlePlaceTextAxios.post(GOOGLE_PLACE_URL.text, params);

// googlePlace nearby
export const getGooglePlaceNearby = (params: object) => googlePlaceNearbyAxios.post(GOOGLE_PLACE_URL.nearby, params);