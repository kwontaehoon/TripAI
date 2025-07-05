import { googlePlaceDetailsAxios, googlePlaceImagesAxios, googlePlaceNearbyAxios, googlePlaceTextAxios } from ".";

const GOOGLE_PLACE_URL = {
    text: "",
    nearby: "",
    details: "",
    images: ""
}

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