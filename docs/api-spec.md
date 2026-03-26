# API Spec

이 프로젝트는 별도의 REST API 서버 없이 **Supabase 클라이언트를 직접 호출**하는 방식으로 동작합니다.
모든 데이터 접근 함수는 [src/service/supabase/index.ts](../src/service/supabase/index.ts)에 정의되어 있습니다.

## Next.js Route Handlers

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/auth/callback` | Supabase OAuth 콜백 처리. `code` 파라미터로 세션 교환 후 리다이렉트 |
| GET | `/auth/confirm` | 이메일 OTP 인증 처리. `token_hash`, `type` 파라미터로 OTP 검증 |

---

## Supabase 서비스 함수

### 사용자 (Users)

#### `getUserInfo(email: string)`
- **동작**: `users` + `boards`, `likes`, `comments`, `comments_replies` 조인 조회
- **반환**: 사용자 정보 + `commentsItem`(작성 댓글/답글 id 배열) + `likesItem`(좋아요한 courses/boards/comments id 배열)
- **조건**: `email` 일치

#### `postEmailCheck(email: string)`
- **동작**: `users` 테이블에서 이메일 존재 여부 확인
- **반환**: 해당 유저 row 또는 null

#### `postSignup(params: { email, name })`
- **동작**: `users.name` 업데이트 (회원가입 시 Supabase Auth 트리거로 row가 먼저 생성됨)
- **반환**: 업데이트 결과

#### `postMypageUpdateProfile(params: { email, profile_image_url })`
- **동작**: `users.profile_image_url` 업데이트
- **반환**: 업데이트 결과

#### `postMypageEdit(params: { email, name, introduce })`
- **동작**: `users.name`, `users.introduce` 업데이트
- **반환**: 업데이트된 `profile_image_url`

#### `deleteUser(email: string)`
- **동작**: `users` 테이블에서 해당 이메일 row 삭제
- **반환**: 삭제 결과

#### `getMypageLikes(courseIds: number[], boardIds: number[])`
- **동작**: `courses`와 `boards`에서 좋아요한 항목을 병렬 조회
- **반환**: courses + boards 데이터 합산 배열

---

### 큐레이션 코스 (Courses)

#### `getCourses()`
- **동작**: `courses` 전체 목록 + 관련 테이블 조인
- **정렬**: `created_at` ASC, `id` ASC
- **조인**: `course_ai_insights`, `course_tags`, `course_highlights`, `course_images`, `course_badges`, `course_days` → `course_places` → `place_tips`

#### `getCoursesInfinite({ pageParam?, limit? })`
- **동작**: cursor 기반 무한 스크롤 페이지네이션
- **파라미터**:
  - `pageParam`: 시작 id (없으면 처음부터)
  - `limit`: 페이지당 항목 수 (기본 10)
- **반환**: `{ courses, nextCursor }`
- **조인**: `comments` + `comments_replies` + 코스 관련 전체 테이블

#### `getCourseDetails(id: number)`
- **동작**: 특정 코스 상세 조회
- **조인**: `comments` + `comments_replies` + 코스 관련 전체 테이블

---

### 게시판 (Boards)

#### `getBoards()`
- **동작**: `boards` 전체 목록 + 관련 테이블 조인
- **정렬**: `id` ASC
- **조인**: `users`, `board_ai_insights`, `board_tags`, `board_highlights`, `board_images`, `board_badges`, `board_days` → `board_places` → `board_place_tips`

#### `getBoardsInfinite({ pageParam?, limit? })`
- **동작**: cursor 기반 무한 스크롤 페이지네이션
- **파라미터**:
  - `pageParam`: 시작 id
  - `limit`: 페이지당 항목 수 (기본 10)
- **반환**: `{ boards, nextCursor }`
- **조인**: `users`, `comments` + `comments_replies` + 게시판 관련 전체 테이블

#### `getBoardDetails(id: number)`
- **동작**: 특정 게시글 상세 조회
- **추가**: 작성자의 총 게시글 수(`total_post`) 계산 후 `users`에 합산
- **정렬**: `board_days.day` ASC, `board_places.id` ASC
- **조인**: `users`, `comments` + `comments_replies` + 게시판 관련 전체 테이블

#### `postBoardCreate(boardData)`
- **동작**: 사용자 작성 게시글 저장 (AI 인사이트 자동 생성 포함)
- **흐름**:
  1. Gemini AI로 board 데이터 보강 (`ai_boardResponse_func`)
  2. `boards` 테이블 insert → id 획득
  3. `board_images`, `board_tags`, `board_highlights`, `board_badges`, `board_ai_insights` 순차 insert
  4. `board_days` → `board_places` → `board_place_tips` 중첩 insert
- **입력**: `{ title, subtitle, description, user_id, duration, participants, difficulty, total_cost, board_tags[], board_highlights[], board_images[], board_places[], dayTitles, daySubtitles, dayNotes, userInfo }`
- **반환**: `{ success: boolean, newBoardId?: number, error?: string }`

---

### AI 코스 (AI Courses)

#### `postAiCourseSave(aiCourseData)`
- **동작**: Gemini AI가 생성한 여행 코스를 `ai_courses` 계열 테이블에 저장
- **흐름**:
  1. `ai_courses` 테이블 insert → id 획득
  2. `ai_course_tags`, `ai_course_highlights`, `ai_course_badges`, `ai_course_ai_insights` insert
  3. `ai_course_days` → `ai_course_places` → `ai_course_place_tips` 중첩 insert
- **입력**: Gemini AI 응답 객체 (`title`, `subtitle`, `description`, `duration`, `course_tags[]`, `course_days[]` 등)
- **반환**: `{ success: boolean, newCourseId?: number, error?: string }`

---

### 통합 조회

#### `getCoursesAndBoards()`
- **동작**: `courses`와 `boards`를 병렬 조회 후 합산 반환
- **정렬**: 각각 `id` ASC
- **용도**: 메인 피드 전체 목록

#### `getCoursesAndBoardsGallery()`
- **동작**: `courses`와 `boards`를 인기순으로 각 6개씩 조회 후 합산 상위 6개 반환
- **정렬**: `likes` DESC → `comments_count` DESC
- **용도**: 홈 갤러리 섹션

---

### 인기/검색

#### `getPopularLocation()`
- **동작**: 지역별(김포·강원도·서울·제주) 코스/게시글 분류
- **방식**: `title`, `content` 컬럼에 키워드 `ilike` 필터
- **반환**: `{ gimpo: [], gangwon: [], seoul: [], jeju: [] }`

#### `getPopularSearch()`
- **동작**: 키워드(김포·제주·강원도)별 코스/게시글 수 집계
- **반환**: `{ gimpo_courses_count, gimpo_boards_count, jeju_courses_count, ... }`

---

### 좋아요 (Likes)

#### `postLike(params: { user_id, board_id?, course_id? })`
- **동작**: 게시글/코스 좋아요 토글 (이미 존재하면 삭제, 없으면 추가)
- **반환**: `{ success: boolean, action: 'inserted' | 'deleted' }`

#### `postCommentLike(params: { user_id, comment_id, board_id?, course_id? })`
- **동작**: 댓글 좋아요 토글
- **반환**: `{ success: boolean, action: 'inserted' | 'deleted' }`

#### `postCommentReplyLike(params: { user_id, comment_reply_id, board_id?, course_id? })`
- **동작**: 대댓글 좋아요 토글
- **반환**: `{ success: boolean, action: 'inserted' | 'deleted' }`

---

### 댓글 (Comments)

#### `getComments(params: { board_id?, course_id? })`
- **동작**: 특정 게시글 또는 코스의 댓글 + 대댓글 조회
- **정렬**: `created_at` ASC (댓글, 대댓글 모두)
- **조인**: `users`, `comments_replies` → `users`

#### `postCommentRegister(params: { content, user_id, board_id?, course_id? })`
- **동작**: 댓글 등록
- **반환**: 생성된 댓글 row

#### `postCommentReplyRegister(params: { content, user_id, parent_comment_id })`
- **동작**: 대댓글 등록
- **반환**: 생성된 대댓글 row

#### `postCommentDelete(id: number)`
- **동작**: 댓글 삭제
- **반환**: 삭제된 댓글 row

#### `postCommentReplyDelete(id: number)`
- **동작**: 대댓글 삭제
- **반환**: 삭제된 대댓글 rows

---

## 인증 (Supabase Auth)

별도 커스텀 함수 없이 Supabase Auth SDK를 직접 사용합니다.

| 동작 | 방법 |
|------|------|
| 이메일/비밀번호 로그인 | `supabase.auth.signInWithPassword()` |
| 소셜 로그인 (OAuth) | `supabase.auth.signInWithOAuth()` → `/auth/callback` 리다이렉트 |
| 이메일 인증 | `supabase.auth.verifyOtp()` → `/auth/confirm` 처리 |
| 로그아웃 | `supabase.auth.signOut()` |
| 세션 갱신 | `proxy.ts` 미들웨어에서 자동 처리 |

> 회원가입 시 `auth.users` row 생성과 동시에 DB 트리거가 `public.users` row를 자동 생성합니다. `postSignup()`은 이후 `name`만 업데이트합니다.

---

## 파일 업로드 (Supabase Storage)

게시글 이미지는 Supabase Storage 버킷에 업로드 후 URL을 `board_images.image_url`에 저장합니다.
스토리지 도메인: `tvkqolkaaqmqftrawadd.supabase.co`
