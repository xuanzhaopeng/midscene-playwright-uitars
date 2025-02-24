import { expect } from "@playwright/test";
import { test } from "./fixture";


test.describe('vinted', () => {


  test.skip("[Browser actions]a user can search then view a product", async ({ page, ai, aiAssert, aiWaitFor }) => {
    await page.goto("https://www.vinted.com")
   
    await aiWaitFor('The country selection popup is visible')
    await ai("Click France in the country selection popup")
    await page.waitForURL((url: URL) => url.hostname.indexOf('vinted.fr') >= 0)
    await ai("Click the button to accept all cookies")
    await ai("Click the search bar, Input 'Chanel', and press the Enter key")
    await ai("Scroll down to the 1st product")
    await ai("Click the 2nd product from the 1st row in the product list")
    
    expect(page.url()).toContain("/items/")
    await aiAssert("Price is visible")
  })


  test.skip("[UI-Tars - Business]a user can search then view a product", async ({ page, ai, aiAssert, aiWaitFor }) => {
    await page.goto("https://www.vinted.com")
   
    await aiWaitFor('The country selection popup is visible')
    await ai("Select France as the country that I'm living")
    await page.waitForURL((url: URL) => url.hostname.indexOf('vinted.fr') >= 0)
    await ai("Accept all privacy preferences")
    await ai("Click Search bar, then Search 'Chanel', and press the Enter")
    await ai("Scroll down to the 1st product")
    await ai("Click the 2nd product from the 1st row in the product list")
    
    expect(page.url()).toContain("/items/")
    await aiAssert("Price is visible")
  })

  test.skip("[GPT-4o - Business]a user can search then view a product", async ({ page, ai, aiAssert, aiWaitFor }) => {
    await page.goto("https://www.vinted.com")
   
    await aiWaitFor('The country selection popup is visible')
    await ai("Select France as the country that I'm living")
    await page.waitForURL((url: URL) => url.hostname.indexOf('vinted.fr') >= 0)
    await ai("Accept all privacy preferences")
    await ai("Search 'Chanel', and press the Enter")
    await ai("Scroll down to the 1st product")
    await ai("Click the 2nd product from the 1st row in the product list")
    
    expect(page.url()).toContain("/items/")
    await aiAssert("Price is visible")
  })

  test("a single description", async ({ page, ai, aiAssert }) => {
    await page.goto("https://www.vinted.com")
   
    await ai('I accept whatever it shows up first, after the page is ready to interect, I can search "Chanel", and I open the 2nd product from the search result')
    await aiAssert("I'm viewing the pruduct detail page")
    await aiAssert("The Price is visible")
  })

})
