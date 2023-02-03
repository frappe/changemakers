export async function login(page) {
  await page.goto("/c/login");
  await page.getByPlaceholder("johndoe@mail.com").click();
  await page.getByPlaceholder("johndoe@mail.com").fill("Administrator");
  await page.getByPlaceholder("johndoe@mail.com").press("Tab");
  await page.getByPlaceholder("••••••").fill("admin");
  await page.getByRole("button", { name: "Log In" }).click();
}

export async function loginToDesk(page) {
  await page.goto("/login");
  await page.getByPlaceholder("jane@example.com").click();
  await page.getByPlaceholder("jane@example.com").fill("Administrator");
  await page.getByPlaceholder("jane@example.com").press("Tab");
  await page.getByPlaceholder("•••••").fill("admin");
  await page.getByPlaceholder("•••••").press("Enter");
}
