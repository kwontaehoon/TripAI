# DB Schema

Supabase(PostgreSQL) `public` 스키마의 전체 테이블 구조입니다.

## 테이블 그룹 개요

| 그룹 | 테이블 | 설명 |
|------|--------|------|
| 사용자 | `users` | 회원 정보 |
| 큐레이션 코스 | `courses`, `course_*` | 전문가/에디터가 작성한 코스 |
| 게시판 | `boards`, `board_*` | 사용자 또는 AI가 작성한 게시글 |
| AI 코스 | `ai_courses`, `ai_course_*` | Gemini AI가 생성한 여행 코스 |
| 소셜 | `comments`, `comments_replies`, `likes`, `view_history` | 댓글·좋아요·조회 이력 |
| 기타 | `subscriptions` | 웹 푸시 구독 |

---

## 사용자

### `users`
| 컬럼 | 타입 | 옵션 | 설명 |
|------|------|------|------|
| id | integer | PK, identity | 사용자 ID |
| name | varchar | NOT NULL | 닉네임 |
| email | text | nullable | 이메일 |
| profile_image_url | text | nullable | 프로필 이미지 URL |
| introduce | text | nullable | 자기소개 |
| follower | integer | default 0 | 팔로워 수 |
| following | integer | default 0 | 팔로잉 수 |
| created_at | timestamptz | default now() | 가입일시 |

---

## 큐레이션 코스 (`courses` 계열)

### `courses`
전문가·에디터가 작성한 여행 코스.

| 컬럼 | 타입 | 옵션 | 설명 |
|------|------|------|------|
| id | integer | PK | 코스 ID |
| title | text | nullable | 제목 |
| subtitle | text | nullable | 부제목 |
| description | text | nullable | 설명 |
| author | text | nullable | 작성자 |
| author_type | text | nullable | 작성자 유형 |
| content | text | nullable | 본문 내용 |
| type | text | nullable | 코스 타입 |
| estimated_time | text | nullable | 예상 소요 시간 |
| duration | text | nullable | 기간 |
| rating | numeric | nullable | 평점 |
| views | integer | nullable | 조회수 |
| likes | integer | nullable | 좋아요 수 |
| participants | text | nullable | 참여 인원 |
| difficulty | integer | nullable | 난이도 |
| total_cost | integer | nullable | 총 비용 |
| total_locations | integer | nullable | 총 장소 수 |
| total_comments | integer | nullable | 총 댓글 수 |
| total_distance | text | nullable | 총 거리 |
| total_places | integer | nullable | 총 방문지 수 |
| reliability | text | nullable | 신뢰도 |
| bookmark | integer | nullable | 북마크 수 |
| created_at | date | nullable | 작성일 |

**참조 받는 테이블**: `course_tags`, `course_highlights`, `course_badges`, `course_images`, `course_days`, `course_ai_insights`, `comments`, `likes`, `view_history`

### `course_tags`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| course_id | integer → courses.id | |
| tag | text | 태그 문자열 |

### `course_highlights`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| course_id | integer → courses.id | |
| highlight | text | 하이라이트 항목 |

### `course_badges`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| course_id | integer → courses.id | |
| badge | text | 배지 항목 |

### `course_images`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| course_id | integer → courses.id | |
| image_url | text | 이미지 URL |

### `course_ai_insights`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| course_id | integer → courses.id | |
| title | text | 인사이트 제목 |
| insight | text | 인사이트 내용 |

### `course_days`
코스의 일별 일정.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| course_id | integer → courses.id | |
| day | integer | 몇 번째 날 |
| title | text | 일정 제목 |
| subtitle | text | 일정 부제목 |
| total_distance | text | 당일 총 거리 |
| total_time | text | 당일 총 시간 |
| author_note | text | 작성자 메모 |
| estimated_cost | integer | 예상 비용 |

### `course_places`
`course_days`에 속하는 장소 목록.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| day_id | integer → course_days.id | |
| name | text | 장소명 |
| description | text | 장소 설명 |
| location_type | text | 장소 유형 |
| stay | text | 체류 시간 |
| open_time | text | 영업시간 |
| entry_fee | text | 입장료 |
| location | text | 주소 |
| distance | text | 이전 장소로부터 거리 |
| recommend_reason | text | 추천 이유 |
| rating_count | numeric | 평점 |
| review_count | integer | 리뷰 수 |
| next_distance | text | 다음 장소까지 거리 |
| next_time | text | 다음 장소까지 시간 |
| latitude | float8 | 위도 |
| longitude | float8 | 경도 |

### `place_tips`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| place_id | integer → course_places.id | |
| tip | text | 방문 팁 |

---

## 게시판 (`boards` 계열)

### `boards`
사용자 또는 AI가 작성한 게시글. `type` 컬럼으로 구분.

| 컬럼 | 타입 | 옵션 | 설명 |
|------|------|------|------|
| id | integer | PK | 게시글 ID |
| type | text | CHECK IN ('ai-course', 'user-post') | 게시글 유형 |
| user_id | integer | → users.id | 작성자 |
| title | text | nullable | 제목 |
| subtitle | text | nullable | 부제목 |
| description | text | nullable | 설명 |
| author | text | nullable | 작성자명 |
| author_type | text | nullable | 작성자 유형 |
| duration | varchar | nullable | 기간 |
| estimated_time | varchar | nullable | 예상 시간 |
| rating | float4 | nullable | 평점 |
| views | integer | nullable | 조회수 |
| likes | integer | nullable | 좋아요 수 |
| participants | varchar | nullable | 참여 인원 |
| difficulty | varchar | nullable | 난이도 |
| total_cost | integer | nullable | 총 비용 |
| total_locations | integer | nullable | 총 장소 수 |
| total_comments | integer | nullable | 총 댓글 수 |
| total_distance | varchar | nullable | 총 거리 |
| total_places | integer | nullable | 총 방문지 수 |
| reliability | varchar | nullable | 신뢰도 |
| bookmark | integer | nullable | 북마크 수 |
| created_at | date | nullable | 작성일 |

**참조 받는 테이블**: `board_tags`, `board_highlights`, `board_badges`, `board_images`, `board_days`, `board_ai_insights`, `comments`, `likes`, `view_history`

### `board_tags` / `board_highlights` / `board_badges` / `board_images`
`courses` 계열과 동일한 구조. `board_id → boards.id` 참조.

### `board_ai_insights`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| board_id | integer → boards.id | |
| title | text | 인사이트 제목 |
| insight | text | 인사이트 내용 |

### `board_days`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| board_id | integer → boards.id | |
| day | integer | 몇 번째 날 |
| title / subtitle | text | |
| total_distance / total_time | varchar | |
| author_note | text | |
| estimated_cost | integer | |

### `board_places`
`board_days`에 속하는 장소 목록. `course_places`와 유사하며 추가 컬럼 포함.

| 추가 컬럼 | 타입 | 설명 |
|-----------|------|------|
| review | text | 사용자 리뷰 |
| create_at | timestamptz | 생성일시 |

### `board_place_tips`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| board_place_id | integer → board_places.id | |
| tip | text | 방문 팁 |

---

## AI 코스 (`ai_courses` 계열)

Gemini AI가 생성한 여행 코스. `courses`와 동일한 컬럼 구조이며 별도 테이블로 분리.

- **`ai_courses`** — 코스 메타 정보 (`courses`와 동일 구조)
- **`ai_course_tags`** — `ai_course_id → ai_courses.id`
- **`ai_course_highlights`** — `ai_course_id → ai_courses.id`
- **`ai_course_badges`** — `ai_course_id → ai_courses.id`
- **`ai_course_images`** — `ai_course_id → ai_courses.id`
- **`ai_course_ai_insights`** — `ai_course_id → ai_courses.id`
- **`ai_course_days`** — `ai_course_id → ai_courses.id` (`course_days`와 동일 구조)
- **`ai_course_places`** — `day_id → ai_course_days.id` (`course_places`와 동일 구조)
- **`ai_course_place_tips`** — `ai_place_id → ai_course_places.id`

---

## 소셜

### `comments`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| content | text | 댓글 내용 |
| likes | integer | 좋아요 수 |
| user_id | integer → users.id | 작성자 |
| board_id | integer → boards.id | 게시판 연결 (nullable) |
| course_id | integer → courses.id | 코스 연결 (nullable) |
| created_at | timestamptz | |

### `comments_replies`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| content | text | 대댓글 내용 |
| parent_comment_id | integer → comments.id | 부모 댓글 |
| user_id | integer → users.id | 작성자 |
| likes | integer | 좋아요 수 |
| created_at | timestamptz | |

### `likes`
댓글·게시글·코스 모두에 사용되는 범용 좋아요 테이블.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| user_id | integer → users.id | |
| board_id | integer → boards.id | nullable |
| course_id | integer → courses.id | nullable |
| comment_id | integer → comments.id | nullable |
| comment_reply_id | integer → comments_replies.id | nullable |
| created_at | timestamptz | |

### `view_history`
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | integer PK | |
| board_id | integer → boards.id | nullable |
| course_id | integer → courses.id | nullable |
| user_id | uuid | 비로그인 포함 식별자 |
| user_flag | boolean | 로그인 여부 |
| created_at | timestamptz | |

---

## 기타

### `subscriptions`
웹 푸시 알림 구독 정보.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | bigint PK | |
| endpoint | text | 푸시 엔드포인트 URL |
| p256dh | text | 암호화 공개키 |
| auth | text | 인증 시크릿 |
| created_at | timestamp | |

---

## ERD 요약 (관계도)

```
users
 ├── boards (user_id)
 ├── comments (user_id)
 ├── comments_replies (user_id)
 └── likes (user_id)

courses
 ├── course_tags
 ├── course_highlights
 ├── course_badges
 ├── course_images
 ├── course_ai_insights
 ├── course_days
 │    └── course_places
 │         └── place_tips
 ├── comments
 ├── likes
 └── view_history

boards (type: 'ai-course' | 'user-post')
 ├── board_tags
 ├── board_highlights
 ├── board_badges
 ├── board_images
 ├── board_ai_insights
 ├── board_days
 │    └── board_places
 │         └── board_place_tips
 ├── comments
 ├── likes
 └── view_history

ai_courses
 ├── ai_course_tags
 ├── ai_course_highlights
 ├── ai_course_badges
 ├── ai_course_images
 ├── ai_course_ai_insights
 └── ai_course_days
      └── ai_course_places
           └── ai_course_place_tips

comments
 └── comments_replies
```
