export const cleanJson = (jsonString: string) => {
    return jsonString
      .replace(/```json\n?|```/g, "")                     // 코드 블록 제거
      .replace(/\/\/[^\n\r]*/g, "")                       // // 주석 제거
      .replace(/\/\*[\s\S]*?\*\//g, "")                   // /* */ 주석 제거
      .replace(/,(\s*[}\]])/g, "$1")                      // 마지막 쉼표 제거
      .replace(/[\u0000-\u001F]+/g, " ")                  // 제어문자 제거
      .replace(/'/g, '"')                                 // 홑따옴표 → 쌍따옴표 (주의)
      .replace(/\s+/g, " ")                               // 줄바꿈 포함 모든 공백 제거
      .trim();
  };
  