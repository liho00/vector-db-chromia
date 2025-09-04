# 🧠 Chromia Vector DB Demo Setup

This guide outlines how to set up and interact with Chromia's Vector DB using the CHR CLI and PMC CLI, and offers a brief comparison with Pinecone's vector database.

---

## 📦 Prerequisites

- Docker
- Java (for CHR CLI)
- [jq](https://stedolan.github.io/jq/) (for processing JSON in bash)
- Git

---

## ⚙️ Installation

### 1. Install CHR CLI

Follow the official Chromia instructions:  
👉 [CHR CLI Installation Guide](https://docs.chromia.com/intro/getting-started/installation/cli-installation)

### 2. Install PMC CLI

👉 [PMC CLI Installation Guide](https://docs.chromia.com/providers/pmc/pmccli-installation)

---

## 🔑 Generate Keys & Config

Generate a keypair and save config in the current directory:

```bash
pmc keygen --save .chromia/config
```

This creates a `.chromia/config` file with content similar to:

```properties
#Keypair generated using secp256k1
#Mon Mar 31 11:05:29 UTC 2025
privkey=******
pubkey=******
api.url=http://127.0.0.1:7740
brid=YOUR_BLOCKCHAIN_RID
```

---

## 🐳 Run the Vector DB Docker

```bash
docker run -d --rm -it -p 7740:7740 registry.gitlab.com/chromaway/example-projects/directory1-example/managed-single:latest
docker logs -f <container id>
```

📌 Once running, copy the `privkey`, `pubkey`, and `brid` from the container logs and replace them in `.chromia/config`.

---

## 📐 Deploy the Vector DB Demo DApp

Clone the project:

```bash
git clone https://github.com/liho00/vector-db-chromia.git
cd vector-db-chromia/chromia/rell
```

Build the DApp:

```bash
chr build
```

Add it to your blockchain:

```bash
pmc blockchain add -bc build/vector_example.xml -c dapp -n vector_blockchain
```

Get the blockchain RID:

```bash
vector_brid=$(pmc blockchains | jq -r '.[] | select(.Name == "vector_blockchain") | .Rid')
```

---

## 📝 Notes & Observations

### Pinecone

✅ Strong ecosystem with index + namespace flexibility  
✅ Custom datatypes in vectors  
✅ Easy SDK and API key integration  
✅ Intuitive UI for data exploration  

### Chromia Vector DB

🟡 Each vector DB requires a new DApp contract (unlike Pinecone’s index/namespace model)  
🟡 No explicit support for namespaces (needs confirmation)  
🟡 All values sent via Postchain SDK must be **stringified**  
✅ Unique approach via smart contracts  
✅ On-chain logic customizability

---

## 📚 Resources

- [Chromia Vector DB Extension (GitLab)](https://gitlab.com/chromaway/core/vector-db-extension)
- [Chromia Docs](https://docs.chromia.com/)
- [Pinecone Docs](https://docs.pinecone.io/)

