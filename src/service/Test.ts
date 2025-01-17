import { clientAxios } from ".";

const ACCOUNT_URL = {
    info: "/api/banner/list"
}

const AI_URL = {
    text: "/"
}

// 내 정보
export const getTest = () => clientAxios(ACCOUNT_URL.info);