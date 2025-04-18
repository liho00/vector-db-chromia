import { createClient, } from "postchain-client";
import { Chromia } from "./langchain";
import { OpenAIEmbeddings } from "@langchain/openai";
import type { Document } from "@langchain/core/documents";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const nodeUrlPool = process.env.NODE_URL_POOL;
if (!nodeUrlPool) throw new Error(`Expected env var NODE_URL_POOL`);

const merkleHashVersion = process.env.MERKLE_HASH_VERSION;
if (!merkleHashVersion) throw new Error(`Expected env var MERKLE_HASH_VERSION`);

const directoryChainRid = process.env.DIRECTORY_CHAIN_RID;
if (!directoryChainRid) throw new Error(`Expected env var DIRECTORY_CHAIN_RID`);

const blockchainRid = process.env.BLOCKCHAIN_RID;
if (!blockchainRid) throw new Error(`Expected env var BLOCKCHAIN_RID`);

const postchainClient = await createClient({
  nodeUrlPool: nodeUrlPool,
  merkleHashVersion: Number(merkleHashVersion),
  directoryChainRid: directoryChainRid,
  blockchainRid: blockchainRid,
})

const vectorStore = new Chromia(embeddings, {
  client: postchainClient,
  numDimensions: embeddings.dimensions,
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

try {
  await vectorStore.delete({ ids: ["4"] });
  console.log("Documents deleted successfully");
} catch (error) {
  console.error("Error adding documents:", error);
}

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
