import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    es: {
      
      "no-unused-vars": "warn", // 사용하지 않는 변수들 경로(warn)로 설정
      "@typescript-eslint/no-unused-vars": "warn",

      "@typescript-eslint/no-explicit-any": "warn", // 'any' 사용을 경고로

      "react/no-unescaped-entities": "warn", // 이스케이프되지 않은 엔티티를 경고로

      "react-hooks/rules-of-hooks": "warn" // React Hook 규칙 위반을 경고로

      // "react-hooks/exhaustive-deps": "warn",
      // "@next/next/no-img-element": "warn",
      // "jsx-a11y/alt-text": "warn",
    }
  },
];

export default eslintConfig;
