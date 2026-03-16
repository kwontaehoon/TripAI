import { test, expect } from '@playwright/test';

test('/courses 페이지 접속 확인', async ({ page }) => {
  const response = await page.goto('/courses');

  expect(response?.status()).toBeLessThan(400);
  expect(page.url()).toContain('/courses');
});
