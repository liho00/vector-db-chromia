import { createClient, } from "postchain-client";

const client = await createClient({
    directoryNodeUrlPool: [
        "http://127.0.0.1:7740",
    ],
    blockchainRid: "8E7654898C87E699F6C8704AEBA75B7E67FDE4943F20F82BC4283C9759624F2D",
})

// chr tx -brid $vector_brid add_message hej "[1.0, 2.0, 3.0]"

// Create the operation
const operation = {
    name: "add_message",
    args: ["hej", "[1.0, 2.0, 3.0]"], // Match expected arguments
};


// Execute the query
client.sendTransaction(operation)
    .then((result) => {
        console.log("Query Result:", result);
    })
    .catch((error) => {
        console.error("Query Error:", error);
    });


// chr query -brid $vector_brid query_closest_objects context=0 q_vector="[1.0, 2.0, 3.0]" max_distance=1.0 max_vectors=2
// [
//     [
//       "distance": "0",
//       "id": 1
//     ],
//     [
//       "distance": "0.0001212999220387978",
//       "id": 3
//     ]
//   ]


// Define the query parameters
const queryName = "query_closest_objects";
const queryParams = {
    context: 0,
    q_vector: "[1.0, 2.0, 3.0]", // Your query vector
    max_distance: "1.0",
    max_vectors: 2,
};

// Execute the query
client.query(queryName, queryParams)
    .then((result) => {
        console.log("Query Result:", result);
    })
    .catch((error) => {
        console.error("Query Error:", error);
    });

