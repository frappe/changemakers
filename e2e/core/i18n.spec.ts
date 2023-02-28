import { test, expect } from "@playwright/test";
import { login } from "../utils";

test("language switcher works", async ({ page }) => {
  await login(page);

  // Navigate to "Account"
  await page.locator('#tab-button-AccountTab svg').click();

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
