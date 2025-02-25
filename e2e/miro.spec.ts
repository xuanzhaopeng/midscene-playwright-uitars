import { expect } from "@playwright/test";
import { test } from "./fixture";

test.describe('miro', () => {
    test("for canvas testing", async ({ page, ai, aiAssert }) => {
        const actionRag = `\n\n
## Additional Production Knowledge to Consider  

- A board is a canvas-based application.
- When a customer reaches the limit of editable boards, they can continue create a team board, there is popup will appear, and the customer must click the button from the popup to continue to create a new team board.  
- To create a sticky note, the customer first need to click the **Plus button** in the left toolbar, then a sub-toolbar menu will appear, in the sub-toolbar menu customer needs to search **Sticky Note** to choose it. After, customer must choose a color for sticky note from the available options, then the sub-menu toolbar will disappeared, and Customer then must click on the desired position on the canvas to place the sticky note. Customer can type any words now to the sticky note.'  
- Free plan customers may see a popup when creating a new board if they have reached the board limit. In this case, to proceed, they must continue to create a new team board from the popup. `

        await page.goto("https://miro.com/app/dashboard")
        expect(page.url()).toBe("https://miro.com/app/dashboard/")
        await ai(`I am a free plan customer, I am in the dashboard page, I create a team board.${actionRag}`)
        await ai(`After I am in the board page, I close whatever popup, and I create a sticky note with text "I am AI Agent" in the center of the screen. ${actionRag}`)
        await aiAssert(`a sticky note with text "I am AI Agent" is visible in the canvas`)
    })
})