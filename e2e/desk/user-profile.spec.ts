import { test, expect } from "@playwright/test";
import { loginToDesk } from "../utils";

test("can create changemakers user profile", async ({ page }) => {
  await loginToDesk(page);
  await page.waitForTimeout(2000);

  await page.goto("http://changemakers.localhost:8000/app/user/Administrator");

  await page
    .getByRole("button", {
      name: "User Profile",
    })
    .click();
  await page.getByRole("link", { name: "Create" }).click();
  await page.getByRole("button", { name: "Save" }).nth(1).click();
});

test("can view changemakers user profile", async ({ page }) => {
  await loginToDesk(page);
  await page.waitForTimeout(2000);

  await page.goto("http://changemakers.localhost:8000/app/user/Administrator");

  await page
    .getByRole("button", {
      name: "User Profile",
    })
    .click();
  await page.getByRole("link", { name: "View" }).click();
});
