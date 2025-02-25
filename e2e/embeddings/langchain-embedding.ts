import { OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";

export class LangchainEmbedding {
    private vectorStore: MemoryVectorStore
    public constructor() {
        const embeddings = new OllamaEmbeddings({ model: "nomic-embed-text", baseUrl: "http://localhost:11434" })
        this.vectorStore = new MemoryVectorStore(embeddings)
    }

    public async addDocuments(documents: Document[]): Promise<void> {
        this.vectorStore.addDocuments(documents)
    }

    public async search(query: string): Promise<string> {
        // return 4 most related results only
        const documents = await this.vectorStore.similaritySearch(query, 4)
        const serializedDocuments = documents.map((doc) => `- ${doc.pageContent}`).join("\n")

        const result = `\n\n## Additional Product Knowledge to Consider
${serializedDocuments}`

        if(process.env.DEBUG === '1') {
            console.debug(`[RAG result] ${result}`)
        }

        return result
    }
}