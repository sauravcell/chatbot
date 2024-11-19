import mongoose from "mongoose";
import dotenv from "dotenv";

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

