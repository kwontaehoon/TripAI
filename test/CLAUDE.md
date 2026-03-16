# test/CLAUDE.md

이 폴더는 두 종류의 테스트를 담고 있습니다.

```
test/
  unit/               ← jest 단위 테스트 (npm test)
  board.spec.ts       ← playwright E2E 테스트
  courses.spec.ts     ← playwright E2E 테스트
```

---

## 단위 테스트 (test/unit/)

### 실행

```bash
npm test                                        # 전체 단위 테스트
npx jest test/unit/comma.spec.ts                # 특정 파일만 실행
```

### 파일 명명 규칙

- `<유틸명>.spec.ts` — 테스트 대상 파일명과 동일하게 작성합니다.
- 예: `src/util/comma.ts` → `test/unit/comma.spec.ts`

### 작성 원칙

1. **순수 로직만 테스트**: 외부 의존성(API, DB, 브라우저)이 없는 유틸/서비스 함수 위주로 작성합니다.
2. **import 경로**: `src/`는 `../../src/`로 접근합니다.
3. **describe로 그룹화**: 조건(분기)별로 `describe` 블록을 나눕니다.

### 예시

```ts
import { comma } from '../../src/util/comma';

describe('comma', () => {
  describe('priceFlag = true (₩ 표시)', () => {
    it('1000 → ₩ 1,000', () => {
      expect(comma(1000, true)).toBe('₩ 1,000');
    });
  });

  describe('priceFlag = false (숫자만)', () => {
    it('1000 → 1,000', () => {
      expect(comma(1000, false)).toBe('1,000');
    });
  });
});
```

### 테스트 대상 가이드

| 파일 | 테스트할 내용 |
|------|--------------|
| `src/util/comma.ts` | 가격 포맷 변환 |
| `src/util/cleanJson.ts` | AI 응답 JSON 정제 |
| `src/util/styles.ts` | 배지 색상 반환 |
| `src/util/date.ts` | 날짜 계산 |

---

## E2E 테스트 (test/*.spec.ts)

### 실행

```bash
npx playwright test                          # 전체 E2E 테스트
npx playwright test test/courses.spec.ts     # 특정 파일만 실행
npx playwright test --ui                     # UI 모드로 실행
npx playwright test --headed                 # 브라우저를 띄워 실행
```

> `playwright.config.ts`에 `webServer` 설정이 되어 있어 서버를 따로 띄우지 않아도 됩니다. 이미 서버가 실행 중이면 재사용합니다.

### 파일 명명 규칙

- `<페이지명>.spec.ts` — 페이지/기능 단위로 파일을 분리합니다.
- 예: `login.spec.ts`, `courses.spec.ts`, `board.spec.ts`
- **`test/unit/` 안에는 playwright 파일을 두지 않습니다.**

### 작성 원칙

1. **사용자 관점으로 작성**: 구현 세부사항이 아닌 사용자 행동(클릭, 입력, 탐색)을 기준으로 작성합니다.
2. **테스트 격리**: 각 `test()`는 독립적으로 실행 가능해야 합니다. 테스트 간 상태를 공유하지 않습니다.
3. **인증이 필요한 테스트**: `test.use({ storageState: 'auth.json' })`으로 로그인 세션을 재사용합니다. (아직 미구현 — 필요 시 `setup.ts`에 구현)
4. **셀렉터 우선순위**: `data-testid` > `role` > `text` > `CSS selector` 순으로 사용합니다.

### 시나리오 예시

```ts
// 페이지 접속 확인
test('/courses 페이지 접속 확인', async ({ page }) => {
  const response = await page.goto('/courses');
  expect(response?.status()).toBe(200);
  expect(page.url()).toContain('/courses');
});

// 사용자 인터랙션
test('이메일/비밀번호로 로그인할 수 있다', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('이메일').fill('test@example.com');
  await page.getByLabel('비밀번호').fill('password123');
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page).toHaveURL('/main');
});
```

### 페이지별 테스트 범위 가이드

| 파일 | 주요 테스트 대상 |
|------|-----------------|
| `login.spec.ts` | 로그인 성공/실패, 비밀번호 찾기 링크 |
| `signup.spec.ts` | 회원가입 폼 유효성 검사, 가입 성공 |
| `courses.spec.ts` | 코스 목록 렌더링, 상세 페이지 이동 |
| `board.spec.ts` | 게시글 목록, 작성, 상세 보기 |
| `main.spec.ts` | AI 입력 모달 오픈, 여행 조건 입력 흐름 |
| `map-dashboard.spec.ts` | 지도 렌더링, 마커 클릭 |
| `mypage.spec.ts` | 프로필 조회 (로그인 필요) |
