import { test, expect } from "@playwright/test";

test("language switcher works", async ({ page }) => {
  await login(page);

  // Navigate to "Account"
  await page
    .getByRole("tab", { name: "Person Account" })
    .locator("svg")
    .click();

  let logOutButton = await page.getByRole("button", { name: "Log Out" });
  let logoutButtonText = await logOutButton.textContent();
  expect(logoutButtonText).toBe("Log Out");

  // switch language
  await page
    .getByRole("combobox", { name: "Preferred Language" })
    .selectOption("हिंदी");

  // Expect the button text to be changed.
  logOutButton = await page.getByRole("button", { name: "लॉग आउट" });
  expect(logOutButton).toBeDefined();
});

async function login(page) {
  await page.goto("/c/login");
  await page.getByPlaceholder("johndoe@mail.com").click();
  await page.getByPlaceholder("johndoe@mail.com").fill("Administrator");
  await page.getByPlaceholder("johndoe@mail.com").press("Tab");
  await page.getByPlaceholder("••••••").fill("admin");
  await page.getByRole("button", { name: "Log In" }).click();
}
