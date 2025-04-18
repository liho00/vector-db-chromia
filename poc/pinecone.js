import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
    // apiKey: '********-****-****-****-************'
    apiKey: process.env.PINECONE_API_KEY,
});
const index = pc.index('topsonvici');

await index.namespace('ns1').upsert([
    {
        id: 'vec1',
        values: [1.0, 1.5],
        metadata: { genre: 'drama' }
    },
    {
        id: 'vec2',
        values: [2.0, 1.0],
        metadata: { genre: 'action' }
    },
    {
        id: 'vec3',
        values: [0.1, 0.3],
        metadata: { genre: 'drama' }
    },
    {
        id: 'vec4',
        values: [1.0, -2.5],
        metadata: { genre: 'action' }
    }
]);


const response = await index.namespace('ns1').query({
    topK: 2,
    vector: [0.1, 0.3],
    includeValues: true,
    includeMetadata: true,
    filter: { genre: { '$eq': 'action' } }
});

console.log(response);