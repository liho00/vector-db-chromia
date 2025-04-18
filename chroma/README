Sure! Here's a `README.md` you can use for your project:

---

# 🌐 Chromia Vector Store Example with LangChain + Postchain

This project demonstrates how to use the **Chromia** vector store with [LangChain](https://js.langchain.com/docs/) and [Postchain](https://github.com/chromia/postchain-client) to store, delete, and search document embeddings using OpenAI's `text-embedding-3-small` model.

## 📦 Features

- Embedding documents with `@langchain/openai`
- Storing and deleting documents in a custom `Chromia` vector store
- Running filtered similarity searches
- Powered by Chromia + Postchain blockchain backend

## 🔧 Prerequisites

- Node.js (>=18)
- An OpenAI API key (set via environment variable)
- A running Postchain node (modify `nodeUrlPool` accordingly)

## 🧪 Setup

1. **Install dependencies**

```bash
bun install
# or
npm install
```

2. **Environment Variables**

Set your OpenAI API key:

```bash
export OPENAI_API_KEY=your_openai_key
```

3. **Configure Postchain**

Update the following values in your script if necessary:

```ts
nodeUrlPool: [
  "http://149.36.1.103:7740",
],
directoryChainRid: "<your-directory-chain-rid>",
blockchainRid: "<your-blockchain-rid>",
```

## 🚀 Usage

### 1. Create Embeddings

Using OpenAI's `text-embedding-3-small`:

```ts
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});
```

### 2. Connect to Postchain

```ts
const postchainClient = await createClient({ ... });
```

### 3. Initialize Chromia Vector Store

```ts
const vectorStore = new Chromia(embeddings, {
  client: postchainClient,
  numDimensions: embeddings.dimensions,
});
```

### 4. Add Documents

```ts
await vectorStore.addDocuments(documents, { ids: ["1", "2", "3", "4"] });
```

### 5. Delete a Document

```ts
await vectorStore.delete({ ids: ["4"] });
```

### 6. Similarity Search with Filter

```ts
const results = await vectorStore.similaritySearch(
  "where is omlympics?",
  1,
  { source: "https://example.com" }
);
```

## 📄 Example Output

```
Documents added successfully
Documents deleted successfully
Similarity search results:
* The 2024 Olympics are in Paris [{"source":"https://example.com"}]
```

## 📁 Project Structure

```
.
├── index.ts             # Main logic for embedding, adding, deleting, and querying
├── langchain.ts         # Custom Chromia vector store implementation
└── README.md
```

## 🧠 Notes

- Ensure the `Chromia` class extends `VectorStore` and implements `addDocuments`, `delete`, and `similaritySearch` using your Postchain backend.
- Proper error handling and retries are recommended for production.

## 📜 License

MIT

---

## 🔗 Reference Implementations

For contributors: this custom store mirrors patterns from existing LangChain integrations.

| Vector Store | Docs | Source |
|--------------|------|--------|
| FAISS        | [Docs](https://js.langchain.com/docs/integrations/vectorstores/faiss/) | [faiss.ts](https://github.com/langchain-ai/langchainjs/blob/main/libs/langchain-community/src/vectorstores/faiss.ts) |
| PGVector     | [Docs](https://js.langchain.com/docs/integrations/vectorstores/pgvector/) | [pgvector.ts](https://github.com/langchain-ai/langchainjs/blob/main/libs/langchain-community/src/vectorstores/pgvector.ts) |
| Chroma       | [Docs](https://js.langchain.com/docs/integrations/vectorstores/chroma/) | [chroma.ts](https://github.com/langchain-ai/langchainjs/blob/main/libs/langchain-community/src/vectorstores/chroma.ts) |
| Supabase     | [Docs](https://js.langchain.com/docs/integrations/vectorstores/supabase/) | [supabase.ts](https://github.com/langchain-ai/langchainjs/blob/main/libs/langchain-community/src/vectorstores/supabase.ts) |
