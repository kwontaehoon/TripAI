import { test, expect } from '@playwright/test';

test.describe('/signup 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('페이지가 정상적으로 로드된다', async ({ page }) => {
    const response = await page.goto('/signup');
    expect(response?.status()).toBeLessThan(400);
    expect(page.url()).toContain('/signup');
  });

  test('"회원가입" 제목이 표시된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '회원가입' })).toBeVisible();
  });

  test('닉네임, 이메일, 비밀번호, 비밀번호 확인 필드가 있다', async ({ page }) => {
    await expect(page.getByPlaceholder('이름을 입력하세요')).toBeVisible();
    await expect(page.getByPlaceholder('이메일을 입력하세요')).toBeVisible();
    await expect(page.getByPlaceholder('비밀번호를 입력하세요')).toBeVisible();
    await expect(page.getByPlaceholder('비밀번호를 다시 입력하세요')).toBeVisible();
  });

  test('필수 필드가 비어있으면 회원가입 버튼이 비활성화된다', async ({ page }) => {

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('필수 약관 미체크 시 회원가입 버튼이 비활성화된다', async ({ page }) => {

    await page.getByPlaceholder('이름을 입력하세요').fill('테스트유저');
    await page.getByPlaceholder('이메일을 입력하세요').fill('test@example.com');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('password123!');
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('password123!');

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('필수 약관 체크 시 회원가입 버튼이 활성화된다', async ({ page }) => {
    await page.getByPlaceholder('이름을 입력하세요').fill('테스트유저');
    await page.getByPlaceholder('이메일을 입력하세요').fill('test@example.com');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('password123!');
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('password123!');

    // 필수 약관 체크
    await page.locator('#terms').check();
    await page.locator('#privacy').check();

    // signup/page.tsx:133-139
    // name + email + password + confirmPassword + terms + privacy 모두 충족 → isFormValid truthy → enabled
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('비밀번호가 일치하지 않으면 실시간 오류 메시지가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('password123!');
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('different456!');

    await expect(
      page.getByText('비밀번호가 일치하지 않습니다.')
    ).toBeVisible();
  });

  test('비밀번호가 일치하면 오류 메시지가 표시되지 않는다', async ({ page }) => {
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('password123!');
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('password123!');

    await expect(
      page.getByText('비밀번호가 일치하지 않습니다.')
    ).not.toBeVisible();
  });

  test('비밀번호 필드는 기본적으로 숨김 상태다', async ({ page }) => {
    await expect(page.getByPlaceholder('비밀번호를 입력하세요')).toHaveAttribute('type', 'password');
    await expect(page.getByPlaceholder('비밀번호를 다시 입력하세요')).toHaveAttribute('type', 'password');
  });

  test('소셜 회원가입 버튼이 표시된다', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Google로 회원가입/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Kakao로 회원가입/ })).toBeVisible();
  });

  test('"로그인" 링크 클릭 시 /login으로 이동한다', async ({ page }) => {
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    await expect(page).toHaveURL(/\/login/);
  });
});
