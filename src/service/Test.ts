import { client } from ".";

const ACCOUNT_URL = {
    info: "/repos/vercel/next.js"
}

// 내 정보
export const getTest = () => client(ACCOUNT_URL.info);