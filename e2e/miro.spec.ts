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

    test.skip("use reason1 and reason2 to plan tests", async ({ page, ai, aiAssert }) => {
        await page.goto("https://miro.com/app/dashboard")
        expect(page.url()).toBe("https://miro.com/app/dashboard/")

        await ai(`
            **ID: ${ uuidv4() }, this is a completely *new* order, forget all memory**

            Given A free plan user#A creates a new board without upgrade,
            When the user#A closes the template popup,
            And the user#A creates a sticky note with desired input "I am an AI Agent"`)
        await aiAssert(`a sticky note contains exact text "I am an AI Agent" is visible`)
    })

    test.skip("[more general]use reason1 and reason2 to plan tests", async ({ page, ai, aiAssert }) => {
        await page.goto("https://miro.com/app/dashboard")
        expect(page.url()).toBe("https://miro.com/app/dashboard/")

        await ai(`
            **ID: ${ uuidv4() }, this is a completely *new* order, forget all memory**

            Given A free plan user#A creates a new board without upgrade,
            And the user#A creates one sticky note in the left side of the grid, 
            then user#A creates another sticky note in the right side of the grid,
            Then the user#A add a line from 1st sticky note to the 2nd sticky note`)

        await aiAssert(`2 sticky notes are connected by a line`)
    })





    test("UI-Tars System-2 Reasoning Validation with non-B2C site", async ({ page, ai, aiAssert }) => {
        await page.goto("https://miro.com/app/dashboard")
        expect(page.url()).toBe("https://miro.com/app/dashboard/")

        await ai(`**ID: ${ uuidv4() }, 这是一个新指令，完全忽略之前的记忆，严格按照指令和规则执行，禁止幻想**
Given A free plan user creates a new board without upgrade,
And the user creates 2 sticky notes in 2 different side of the grid, 
Then the user adds a line from 1st sticky note to the 2nd sticky note`)

        await aiAssert(`2 sticky notes are connected by a line`)
    })






})