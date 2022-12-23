import { test, expect } from "@playwright/test"

test("Homepage has a button", async ({ page }) => {
  await page.goto("http://localhost:3000")

  const button = page.getByRole("button", {
    name: /Boop/i,
  })

  await expect(button).toBeVisible()
})
