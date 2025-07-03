import { clientAxios, aiAxios, googlePlaceTextAxios, googlePlaceNearbyAxios, googlePlaceDetailsAxios, googlePlaceImagesAxios, nextjsAxios } from ".";

const ACCOUNT_URL = {
    nextjs: "",
    info: "/api/banner/list",
    pick: "/api/pick/list",
    testPageNation: "/api/test2"
}



const API_URL = {
    urlList: "/api/url/list",
    urlRegister: "/api/url/register",
    urlCheck: "/api/url/check"
}

// test
export const getTest = () => clientAxios.get(ACCOUNT_URL.pick);

// test2
export const getTest2 = () => clientAxios.get(ACCOUNT_URL.pick);

// testPageNation
export const getTestPageNation = (params: number) => clientAxios.get(ACCOUNT_URL.testPageNation, {
    params: {
        page: params
    }
});

// nextjs test
export  const getNextJS = () => nextjsAxios.get(ACCOUNT_URL.nextjs);



// urlList
export const getUrlList = () => clientAxios.get(API_URL.urlList);

// urlCheck
export const postUrlCheck = (params: object) => clientAxios.post(API_URL.urlCheck, params);

// urlRegister
export const postUrlRegister = (params: object) => clientAxios.post(API_URL.urlRegister, params);