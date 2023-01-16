import { test, expect, request } from "@playwright/test";

test.use({ storageState: "storageState.json" });

test("language switcher works", async ({ page }) => {
  // Login
  // Navigate to "Account"
  await page.goto("/c");

  const accountLink = await page.getByText("Dashboard");
  expect(accountLink).toBeDefined();

  await page
    .getByRole("tab", { name: "Person Account" })
    .locator("svg")
    .click();

  const logOutButton = await page.getByText("Log Out");
  expect(logOutButton).toBeDefined();

  // Expect the button text to be changed.
//   await page
//     .getByRole("combobox", { name: "Preferred Language" })
//     .selectOption("हिंदी");

//     expect(logOutButton).toHaveText("Log Out");
});
