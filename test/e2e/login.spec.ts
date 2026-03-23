import { test, expect } from '@playwright/test';

test.describe('/login 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('페이지가 정상적으로 로드된다', async ({ page }) => {
    const response = await page.goto('/login');
    expect(response?.status()).toBeLessThan(400);
    expect(page.url()).toContain('/login');
  });

  test('"로그인" 제목이 표시된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
  });

  test('이메일과 비밀번호 입력 필드가 있다', async ({ page }) => {
    await expect(page.getByPlaceholder('이메일을 입력하세요')).toBeVisible();
    await expect(page.getByPlaceholder('비밀번호를 입력하세요')).toBeVisible();
  });

  test('이메일과 비밀번호를 입력할 수 있다', async ({ page }) => {
    await page.getByPlaceholder('이메일을 입력하세요').fill('test@example.com');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('password123');

    await expect(page.getByPlaceholder('이메일을 입력하세요')).toHaveValue('test@example.com');
    await expect(page.getByPlaceholder('비밀번호를 입력하세요')).toHaveValue('password123');
  });

  test('비밀번호 필드는 기본적으로 숨김 상태다', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('비밀번호를 입력하세요');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('눈 아이콘 클릭 시 비밀번호가 표시된다', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('비밀번호를 입력하세요');
    await passwordInput.fill('mypassword');

    // 눈 아이콘 버튼 클릭
    await page.locator('button[type="button"]').filter({ has: page.locator('svg') }).last().click();

    await expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('"비밀번호 찾기" 클릭 시 /forgot-password로 이동한다', async ({ page }) => {
    await page.getByRole('button', { name: '비밀번호 찾기' }).click();
    await expect(page).toHaveURL(/\/forgot-password/);
  });

  test('"회원가입" 링크 클릭 시 /signup으로 이동한다', async ({ page }) => {
    await page.getByRole('button', { name: '회원가입', exact: true }).click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test('소셜 로그인 버튼이 표시된다', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Google로 로그인/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Kakao로 로그인/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Apple로 로그인/ })).toBeVisible();
  });

  test('잘못된 이메일/비밀번호 입력 시 비밀번호 입력 필드 하단에 오류 메시지가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('이메일을 입력하세요').fill('wrong@example.com');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('wrongpassword');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(submitButton).not.toBeDisabled({ timeout: 15000 });
    await expect(page.locator('.mt-2.text-sm.text-red-500')).toBeVisible();
  });
});