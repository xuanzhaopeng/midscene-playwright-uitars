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
            new Document({pageContent: 'Create a board: user need to click "create board" button in the dashboard page, and if user is a free plan customer, then the user will see a popup about "reached limit of the editable boards" when there are more than 3 boards, user can continue click "create team board" button from the popup.'}),
            new Document({pageContent: 'Create a sticky note by search: First of all, user must click the **Plus button** in the left toolbar to open a sub-toolbar menu, then in the sub-toolbar menu, user needs to search **Sticky Note** from the sub-menu toolbar, and choose the "Sticky Note" from the search result. After, user needs to click on the desired position on the canvas to put the sticky note. User now can type any words to the sticky note directly.'}),
            new Document({pageContent: 'Create a sticky note directly: In the left toolbar, there is a button with sticky note icon, user clicks it, and then click on the desired position on the canvas to place it.'}),
            new Document({pageContent: 'Free plan user may see a popup when creating a new board if there are already more 3 boards. In this case, to proceed, user must continue to create a new team board from the popup.'}),
            new Document({pageContent: 'User can search a board by a board title'})
        ])
    })

    test("for canvas testing", async ({ page, ai, aiAssert }) => {
        // Requires changes from Midscene - (https://github.com/web-infra-dev/midscene/issues/426)
        // const searchedRag:string = await rag.search(`I am a free plan customer, I am in the dashboard page, I create a team board. After I am in the board page, I close all popups first, and I create a sticky note with text "I am AI Agent" in the center of the screen.`)

        await page.goto("https://miro.com/app/dashboard")
        expect(page.url()).toBe("https://miro.com/app/dashboard/")
        await ai(`I am a free plan user, I am in the dashboard page, I create any kinds of board. I don't use any templates just an empty board. In board page, I create a sticky note with text "I am AI Agent" in the center of the screen.`)
        await aiAssert(`a sticky note contains exact text "I am AI Agent" is visible`)
    })
})