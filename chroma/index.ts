// import { Chroma } from "@langchain/community/vectorstores/chroma";
import { Chroma } from "./langchain";
import { OpenAIEmbeddings } from "@langchain/openai";
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// import { pipeline } from "@huggingface/transformers";
// import { DefaultEmbeddingFunction } from "chromadb";
// const defaultEF = new DefaultEmbeddingFunction();
// const embeddings = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { dtype: "fp32" });

const vectorStore = new Chroma(embeddings, {
  collectionName: "a-test-collection",
  url: "http://149.36.1.103:8000", // Optional, will default to this value
  collectionMetadata: {
    "hnsw:space": "cosine",
  }, // Optional, can be used to specify the distance method of the embedding space https://docs.trychroma.com/usage-guide#changing-the-distance-function
});


import type { Document } from "@langchain/core/documents";

const document1: Document = {
  pageContent: "The powerhouse of the cell is the mitochondria",
  metadata: { source: "https://example.com" },
};

const document2: Document = {
  pageContent: "Buildings are made out of brick",
  metadata: { source: "https://example.com" },
};

const document3: Document = {
  pageContent: "Mitochondria are made out of lipids",
  metadata: { source: "https://example.com" },
};

const document4: Document = {
  pageContent: "The 2024 Olympics are in Paris",
  metadata: { source: "https://example.com" },
};

const documents = [document1, document2, document3, document4];

try {
  await vectorStore.addDocuments(documents, { ids: ["1", "2", "3", "4"] });
  console.log("Documents added successfully");
} catch (error) {
  console.error("Error adding documents:", error);
}
