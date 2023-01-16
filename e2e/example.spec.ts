import { test, expect } from '@playwright/test';

test("test", async ({ page }) => {
  await page.goto("http://changemakers.localhost:8000/c");
  
  await page.getByPlaceholder('johndoe@mail.com').click();
  await page.getByPlaceholder('johndoe@mail.com').fill('Administrator');
  await page.getByPlaceholder('johndoe@mail.com').press('Tab');
  await page.getByPlaceholder('••••••').fill('admin');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByText('Dashboard').click();
  await page.getByText('Account').click();
});

