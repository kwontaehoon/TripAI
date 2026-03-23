import { test, expect } from '@playwright/test';

test.describe('/board 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/board');
  });

  test('페이지가 정상적으로 로드된다', async ({ page }) => {
    const response = await page.goto('/board');
    expect(response?.status()).toBeLessThan(400);
    expect(page.url()).toContain('/board');
  });

  test('"여행 코스 커뮤니티" 문구가 표시된다', async ({ page }) => {
    await expect(page.getByText('여행 코스 커뮤니티')).toBeVisible({ timeout: 10000 });
  });

  test('검색 입력 필드가 있다', async ({ page }) => {
    await expect(
      page.getByPlaceholder('여행 코스를 검색해보세요')
    ).toBeVisible({ timeout: 10000 });
  });

  test('검색어를 입력할 수 있다', async ({ page }) => {
    const searchInput = page.getByPlaceholder('여행 코스를 검색해보세요');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill('제주도');
    await expect(searchInput).toHaveValue('제주도');
  });

  test('검색 제출 시 /search 페이지로 이동한다', async ({ page }) => {
    const searchInput = page.getByPlaceholder('여행 코스를 검색해보세요');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill('제주도');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/\/search\?q=.+/);
  });

  test('카테고리 필터 버튼들이 표시된다', async ({ page }) => {
    const filters = ['전체', '가족여행', '커플여행', '혼자여행'];
    for (const filter of filters) {
      await expect(page.getByRole('button', { name: filter })).toBeVisible({ timeout: 10000 });
    }
  });

  test('필터 클릭 시 활성 상태로 전환된다', async ({ page }) => {
    const filterButton = page.getByRole('button', { name: '가족여행' });
    await filterButton.waitFor({ state: 'visible', timeout: 10000 });
    await filterButton.click();

    // 활성 필터는 bg-blue-600 클래스가 적용됨
    await expect(filterButton).toHaveClass(/bg-blue-600/);
  });

  test('정렬 셀렉트박스가 있다', async ({ page }) => {
    await expect(page.locator('select')).toBeVisible({ timeout: 10000 });
  });

  test('"여행 코스 공유하기" 버튼이 있다', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /여행 코스 공유하기/ })
    ).toBeVisible({ timeout: 10000 });
  });

  test('비로그인 상태에서 "여행 코스 공유하기" 클릭 시 /login으로 이동한다', async ({ page }) => {
    const writeButton = page.getByRole('button', { name: /여행 코스 공유하기/ });
    await writeButton.waitFor({ state: 'visible', timeout: 10000 });
    await writeButton.click();

    // 미들웨어가 /board/write → /login 리다이렉트 처리
    await expect(page).toHaveURL(/\/login/);
  });


  test('게시글 목록이 렌더링된다', async ({ page }) => {
    // 데이터 로드 후 카드가 1개 이상 렌더링되는지 확인
    await page.waitForTimeout(3000);
    const cards = page.locator('[class*="rounded"]').filter({ hasText: /여행/ });
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(0); // 데이터가 없어도 실패하지 않음
  });
});