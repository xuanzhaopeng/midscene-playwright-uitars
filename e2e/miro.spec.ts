import { expect } from "@playwright/test";
import { test } from "./fixture";
import { LangchainEmbedding } from "./embeddings/langchain-embedding";
import { Document } from "langchain/document";

test.describe('miro', () => {
    const rag = new LangchainEmbedding()

    test.beforeAll(async () => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await rag.addDocuments([
            new Document({pageContent :'A board is a canvas-based application.'}),
            new Document({pageContent: 'How to creat a board: customer need to click "create board" button in the dashboard page, and if customer uses free plan, then customer will see a popup about "reached limit of the editable boards" when there are more than 3 boards, customer then can continue create team board from this popup.'}),
            new Document({pageContent: 'To create a sticky note, the customer first need to click the **Plus button** in the left toolbar, then a sub-toolbar menu will appear, in the sub-toolbar menu customer needs to search **Sticky Note** to choose it. After, customer must choose a color for sticky note from the available options, then the sub-menu toolbar will disappeared, and Customer then must click on the desired position on the canvas to place the sticky note. Customer can type any words now to the sticky note.'}),
            new Document({pageContent: 'Free plan customers may see a popup when creating a new board if they have reached the board limit. In this case, to proceed, they must continue to create a new team board from the popup.'}),
            new Document({pageContent: 'Customer can search a board by a board title'})
        ])
    })

    test("for canvas testing", async ({ page, ai, aiAssert }) => {
        const searchedRag:string = await rag.search(`I am a free plan customer, I am in the dashboard page, I create a team board. After I am in the board page, I close all popups first, and I create a sticky note with text "I am AI Agent" in the center of the screen.`)

        await page.goto("https://miro.com/app/dashboard")
        expect(page.url()).toBe("https://miro.com/app/dashboard/")
        await ai(`I am a free plan customer, I am in the dashboard page, I create a board.${searchedRag}`)
        await ai(`After I am in the board page, I must close all popups first until I can interact with left toolbar, then I create a sticky note with text "I am AI Agent" in the center of the screen. ${searchedRag}`)
        await aiAssert(`a sticky note with text "I am AI Agent" is visible in the canvas`)
    })
})