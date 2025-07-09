export const cleanJson = (jsonString: string) => {
    return jsonString
      .replace(/```json\n|```/g, "")                // 코드 블록 마커 제거
      .replace(/\/\/[^\n\r]*/g, "")                 // // 주석 제거
      .replace(/\/\*[\s\S]*?\*\//g, "")             // /* */ 주석 제거
      .replace(/,(\s*})/g, "$1")                    // 객체 마지막 쉼표 제거
      .replace(/,(\s*\])/g, "$1")                   // 배열 마지막 쉼표 제거
      .replace(/[\u0000-\u001F]+/g, " ")            // 제어문자 제거
      .replace(/'([^']*?)'/g, (match, p1) => `"${p1.replace(/"/g, '\\"')}"`) // '...' → "..."
      .trim();
  };
  