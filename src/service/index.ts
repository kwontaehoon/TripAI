import axios from "axios";

export const clientAxios = axios.create({
  // baseURL: "http://localhost:8080", 
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "x-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Credentials": true,
    // 'Content-Type': 'multipart/form-data',
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json", // 옵션: 'qrraybuffer', 'document' ...
  responseEncoding: "utf8", // 클라이언트 사이드 요청
  decompress: true,
  withCredentials: true, // cors
});

clientAxios.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기
    // const token = localStorage.getItem('token');
    // 토큰이 존재하면 헤더에 토큰 설정
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

export const nextjsAxios = axios.create({
  baseURL: "https://api.github.com/repos/vercel/next.js",
  timeout: 100000,
  // headers: {
  //   "x-Requested-With": "XMLHttpRequest",
  //   "Access-Control-Allow-Credentials": true,
  //   "Access-Control-Allow-Origin": "*",
  // },
  responseType: "json",
  responseEncoding: "utf8",
  decompress: true,
  // withCredentials: true,
})

export const aiAxios = axios.create({
  baseURL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API}`,
  timeout: 100000,
  // headers: {
  //   "x-Requested-With": "XMLHttpRequest",
  //   "Access-Control-Allow-Credentials": true,
  //   "Access-Control-Allow-Origin": "*",
  // },
  responseType: "json",
  responseEncoding: "utf8",
  decompress: true,
  // withCredentials: true,
})

export const googlePlaceTextAxios = axios.create({
  baseURL: "https://places.googleapis.com/v1/places:searchText",
  timeout: 10000,
  headers: {
    // "x-Requested-With": "XMLHttpRequest",
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Origin": "*",
    "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.priceLevel,places.id"
  },
  responseType: "json",
  responseEncoding: "utf8",
  decompress: true,
  // withCredentials: true,
})

export const googlePlaceNearbyAxios = axios.create({
  baseURL: "https://places.googleapis.com/v1/places:searchNearby",
  timeout: 10000,
  headers: {
    // "x-Requested-With": "XMLHttpRequest",
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Origin": "*",
    "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    "X-Goog-FieldMask": "places.displayName"
  },
  responseType: "json",
  responseEncoding: "utf8",
  decompress: true,
  // withCredentials: true,
})

export const googlePlaceDetailsAxios = axios.create({
  baseURL: "https://places.googleapis.com/v1/places",
  timeout: 10000,
  headers: {
    // "x-Requested-With": "XMLHttpRequest",
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Origin": "*",
    "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    "X-Goog-FieldMask": "id,displayName,photos",
    "Content-Type": ""
  },
  responseType: "json",
  responseEncoding: "utf8",
  decompress: true,
  // withCredentials: true,
})

export const googlePlaceImagesAxios = axios.create({
  baseURL: "https://places.googleapis.com/v1",
  timeout: 10000,
  headers: {
    // "x-Requested-With": "XMLHttpRequest",
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
  responseEncoding: "utf8",
  decompress: true,
  // withCredentials: true,
})
