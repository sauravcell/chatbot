import mongoose from "mongoose";
import dotenv from "dotenv";
import {MongoClient, ServerApiVersion} from "mongodb" 

dotenv.config();

export const connectDB = async ()=>{
    try {

        await mongoose.connect(process.env.mongo_url);
        console.log("Database connected successfully");
    } catch (error) {
        console.error(`could'nt connect to database: ${error}`);
        process.exit(1);  // Exit the process if the connection fails
    }
};
//************************************************************** */
// import {MongoClient, ServerApiVersion} from 

// // const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sauravghosh2304:<db_password>@sgdmschatbot.vsa6t.mongodb.net/?retryWrites=true&w=majority&appName=sgdmsChatbot";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
