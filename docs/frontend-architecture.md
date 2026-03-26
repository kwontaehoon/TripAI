# Frontend Architecture

## 기술 스택

- **프레임워크**: Next.js (App Router) + React 19
- **백엔드**: Supabase (PostgreSQL + Auth + Storage) — DB 로직은 모두 `src/service/supabase/index.ts`에 위치
- **AI**: Google Gemini API (`src/service/gemini.ts`)
- **지도**: `@react-google-maps/api` — `src/config/provider/map-provider.tsx`에서 한 번만 초기화
- **상태 관리**: 전역 UI 상태는 Jotai atoms (`src/store/`), 서버 데이터는 TanStack Query + SWR

## 핵심 아키텍처 패턴

**PC/Mobile 분리**: 복잡한 페이지(예: `map-dashboard`)는 `pc.tsx` / `mobile.tsx`로 구현을 분리하여 조건부 렌더링합니다. Google Maps 초기화 중복을 피하기 위해 공통 로직은 `use<PageName>.ts` 훅으로 추출합니다.

**Server/Client 컴포넌트 분리**: 페이지는 `page.tsx`(데이터 프리페치용 서버 컴포넌트) + `client.tsx`(인터랙션용 클라이언트 컴포넌트)로 구성됩니다. 프리페치 헬퍼는 `src/service/prefetch.ts`에 있습니다.

**모달 시스템**: 모든 모달은 `src/modal/index.tsx`에 등록되며 `src/store/`의 Jotai atoms로 제어됩니다. 주요 사용자 흐름은 `src/modal/ai-input.tsx`에서 시작합니다.

**경로 별칭**:
- `@/*` → `src/*`
- `@svg/*` → `/public/svg/*`

## 주요 설정 참고사항

- `next.config.ts`에서 `reactStrictMode: false`
- TypeScript 빌드 오류 무시 설정 (`ignoreBuildErrors: true`) — 빌드로 타입 오류를 잡으면 안 됨
- Supabase 세션 미들웨어는 루트의 `proxy.ts`에서 실행 (`middleware.ts` 역할)
- Supabase 스토리지(`tvkqolkaaqmqftrawadd.supabase.co`)와 Google Places API의 이미지 허용

## Supabase 클라이언트 사용

- **서버 컴포넌트**: `src/service/supabase/server.ts`
- **클라이언트 컴포넌트**: `src/service/supabase/client.ts`
- **관리자 작업**: `src/service/supabase/admin.ts`
- **모든 DB 쿼리**: `src/service/supabase/index.ts`

## AI 흐름

1. 사용자가 `src/modal/ai-input.tsx`에서 여행 조건 입력
2. `src/service/gemini.ts`를 통해 Gemini API로 요청
3. 응답은 Jotai `aiResponseAtom` (`src/store/ai.ts`)에 저장
4. `src/common/ai/ai_response.tsx` 및 `src/hooks/useAiResponse*.ts` 훅으로 렌더링
5. `map-dashboard`에서 Google Maps로 장소 시각화
