import { test, expect } from "@playwright/test";

test("user can login", async ({ page }) => {
  await page.goto("/c");

  await page.getByPlaceholder("johndoe@mail.com").click();
  await page.getByPlaceholder("johndoe@mail.com").fill("Administrator");
  await page.getByPlaceholder("johndoe@mail.com").press("Tab");
  await page.getByPlaceholder("••••••").fill("admin");
  await page.getByRole("button", { name: "Log In" }).click();

  const dashboardLink = await page.getByText("Dashboard");
  const accountLink = await page.getByText("Account");

  expect(dashboardLink).toBeDefined();
  expect(accountLink).toBeDefined();
});
