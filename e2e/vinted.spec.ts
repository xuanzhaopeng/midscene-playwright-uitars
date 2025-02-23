import { test } from "./fixture";


test.describe('vinted', () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test("user must select a country", async ({ page, ai, aiQuery, aiAssert, aiWaitFor }) => {
    await page.goto("https://www.vinted.com");
    await ai("Click France in the country selection popup");
    await page.waitForURL((url: URL) => url.hostname.indexOf('vinted.fr') >= 0)
    await ai("Click the button to accept all cookies")
    await ai("Click the search bar, Input 'Chanel', and press the Enter key")
    await ai("Scroll down to the 1st row of product list")
    await ai("Click the 2nd product from the 1st row in the product list")
  });
})
