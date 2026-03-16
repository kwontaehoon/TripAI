import { test, expect } from '@playwright/test';

test('/board 페이지 접속 확인', async ({ page }) => {
  const response = await page.goto('/board');

  expect(response?.status()).toBeLessThan(400);
  expect(page.url()).toContain('/board');
});
