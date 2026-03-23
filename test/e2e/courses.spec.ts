import { test, expect } from '@playwright/test';

test.describe('/courses 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/courses');
  });

  test('페이지가 정상적으로 로드된다', async ({ page }) => {
    const response = await page.goto('/courses');
    expect(response?.status()).toBeLessThan(400);
    expect(page.url()).toContain('/courses');
  });

  test('검색 입력 필드가 있다', async ({ page }) => {
    await expect(
      page.getByPlaceholder('다른 여행지를 검색해보세요')
    ).toBeVisible({ timeout: 10000 });
  });

  test('검색어를 입력할 수 있다', async ({ page }) => {
    const searchInput = page.getByPlaceholder('다른 여행지를 검색해보세요');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill('부산');
    await expect(searchInput).toHaveValue('부산');
  });

  test('카테고리 필터 버튼들이 표시된다', async ({ page }) => {
    const filters = ['전체', '가족여행', '커플여행'];
    for (const filter of filters) {
      await expect(page.getByRole('button', { name: filter })).toBeVisible({ timeout: 10000 });
    }
  });

  test('필터 클릭 시 활성 상태로 전환된다', async ({ page }) => {
    const filterButton = page.getByRole('button', { name: '커플여행' });
    await filterButton.waitFor({ state: 'visible', timeout: 10000 });
    await filterButton.click();

    await expect(filterButton).toHaveClass(/bg-blue-600/);
  });

  test('"전체" 필터 재클릭 시 기본 상태로 돌아온다', async ({ page }) => {
    const coupleFilter = page.getByRole('button', { name: '커플여행' });
    await coupleFilter.waitFor({ state: 'visible', timeout: 10000 });
    await coupleFilter.click();

    const allFilter = page.getByRole('button', { name: '전체' });
    await allFilter.click();

    await expect(allFilter).toHaveClass(/bg-blue-600/);
    await expect(coupleFilter).not.toHaveClass(/bg-blue-600/);
  });

  test('정렬 셀렉트박스가 있다', async ({ page }) => {
    await expect(page.locator('select')).toBeVisible({ timeout: 10000 });
  });

  test('빠른 필터 버튼들이 표시된다', async ({ page }) => {
    await expect(page.getByText('⭐ 평점 4.5 이상')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('💰 20만원 이하')).toBeVisible({ timeout: 10000 });
  });
});