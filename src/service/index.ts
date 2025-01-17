import axios from "axios";

export const clientAxios = axios.create({
  // baseURL: "http://localhost:8080", 
  baseURL: "http://3.36.37.240:8080",
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

export const aiAxios = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
  timeout: 10000,
  headers: {
    "x-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
  responseEncoding: "utf8",
  decompress: true,
  withCredentials: true,
})

