import { createClient, } from "postchain-client";
import { Chromia } from "./langchain";
import { OpenAIEmbeddings } from "@langchain/openai";
import type { Document } from "@langchain/core/documents";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const postchainClient = await createClient({
  nodeUrlPool: [
    "http://149.36.1.103:7740",
  ],
  merkleHashVersion: 1,
  directoryChainRid: "D7A4F6E3C2B9E1A5F7B4D6F7C8F0A4E6B2C3D4E5F6A7B8C9D0E1F2G3H4I5J6K7",
  blockchainRid: "24779C88CC7967CE4111C04931217329648A7989B016F13C006E021D86DBE934",
})

const vectorStore = new Chromia(embeddings, {
  client: postchainClient,
  numDimensions: 3,
});

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

// try {
//   await vectorStore.delete({ ids: ["Mitochondria are made out of lipids"] });
//   console.log("Documents deleted successfully");
// } catch (error) {
//   console.error("Error adding documents:", error);
// }

const filter = { source: "https://example.com" };

const similaritySearchResults = await vectorStore.similaritySearch(
  "where is omlympics?",
  1,
  filter
);
console.log("Similarity search results:", similaritySearchResults);

for (const doc of similaritySearchResults) {
  console.log(`* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`);
}
