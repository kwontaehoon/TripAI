import { aiAxios } from '.'

const GEMINI_URL = {
    ai: ""
}

// gemini ai
export const getGeminiAi = (params: object) => aiAxios.post(GEMINI_URL.ai, params);
