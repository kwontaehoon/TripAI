import { test, expect } from '@playwright/test';

test.describe('/main 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/main');
  });

  test('페이지가 정상적으로 로드된다', async ({ page }) => {
    const response = await page.goto('/main');
    expect(response?.status()).toBeLessThan(400);
    expect(page.url()).toContain('/main');
  });

  test('검색 입력 필드가 있다', async ({ page }) => {
    await expect(
      page.getByPlaceholder('어떤 여행을 계획하고 계신가요?')
    ).toBeVisible({ timeout: 10000 });
  });

  test('검색어가 없으면 검색 제출 시 이동하지 않는다', async ({ page }) => {
    const searchInput = page.getByPlaceholder('어떤 여행을 계획하고 계신가요?');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });

    // 검색어 없이 제출
    await searchInput.press('Enter');

    // URL이 /main에서 변경되지 않아야 함
    expect(page.url()).toContain('/main');
    expect(page.url()).not.toContain('/search');
  });

  test('검색어가 있으면 검색 제출 시 /search 페이지로 이동한다', async ({ page }) => {
    const searchInput = page.getByPlaceholder('어떤 여행을 계획하고 계신가요?');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });

    await searchInput.fill('제주도');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/\/search\?q=.+/);
  });

  test('코스 목록 섹션이 표시된다', async ({ page }) => {
    await expect(page.getByText('코스').first()).toBeVisible({ timeout: 10000 });
  });

  test('보드 목록 섹션이 표시된다', async ({ page }) => {
    await expect(page.getByText('보드').or(page.getByText('커뮤니티')).first()).toBeVisible({ timeout: 10000 });
  });
});
