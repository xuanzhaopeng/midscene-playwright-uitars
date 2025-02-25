import { expect } from "@playwright/test";
import { test } from "./fixture";
import { LangchainEmbedding } from "./embeddings/langchain-embedding";
import { Document } from "langchain/document";
import { v4 as uuidv4 } from "uuid";

test.describe('miro', () => {
    const rag = new LangchainEmbedding()

    test.beforeAll(async () => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await rag.addDocuments([
            new Document({pageContent :'A board is a canvas-based application.'}),
            new Document({pageContent: 'Create a board: user need to click "create board" button in the dashboard page, and if user is a free plan customer, then the user will see a popup about "reached limit of the editable boards" when there are more than 3 boards, user can continue click "create team board" button from the popup.'}),
            new Document({pageContent: 'Create a sticky note by search: First of all, user must click the **Plus button** in the left toolbar to open a sub-toolbar menu, then in the sub-toolbar menu, user needs to search **Sticky Note** from the sub-menu toolbar, and choose the "Sticky Note" from the search result. After, user needs to click on the desired position on the canvas to put the sticky note. User now can type any words to the sticky note directly.'}),
            new Document({pageContent: 'Create a sticky note directly: In the left toolbar, there is a button with sticky note icon, user clicks it, and then click on the desired position on the canvas to place it.'}),
            new Document({pageContent: 'Free plan user may see a popup when creating a new board if there are already more 3 boards. In this case, to proceed, user must continue to create a new team board from the popup.'}),
            new Document({pageContent: 'User can search a board by a board title'})
        ])
    })

    test.skip("for canvas testing", async ({ page, ai, aiWaitFor, aiAssert }) => {
        // Requires changes from Midscene - (https://github.com/web-infra-dev/midscene/issues/426)
        // const searchedRag:string = await rag.search(`I am a free plan customer, I am in the dashboard page, I create a team board. After I am in the board page, I close all popups first, and I create a sticky note with text "I am AI Agent" in the center of the screen.`)

        await page.goto("https://miro.com/app/dashboard")
        expect(page.url()).toBe("https://miro.com/app/dashboard/")
        
        await ai(`A free plan user creates a new board without upgrade, and don't close template popup`)
        await aiWaitFor(`the template popup is visible`)
        await ai(`the user closes the template popup`)
        await ai(`the user creates a sticky note, with text "I am an AI Agent"`)
        await aiAssert(`a sticky note contains exact text "I am an AI Agent" is visible`)
    })


    test("for canvas testing a single reasoning", async ({ page, ai, aiAssert }) => {
        await page.goto("https://miro.com/app/dashboard")
        expect(page.url()).toBe("https://miro.com/app/dashboard/")

        await ai(`
            **ID: ${ uuidv4() }, this is a completely *new* order, forget all memory**

            Given A free plan user#A creates a new board without upgrade,
            When the user#A closes the template popup,
            And the user#A creates a sticky note with desired input "I am an AI Agent"`)
        await aiAssert(`a sticky note contains exact text "I am an AI Agent" is visible`)
    })
})