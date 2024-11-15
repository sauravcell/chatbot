import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./dbConnection.mjs";
import route from "./routes/chatbot_route.mjs";
import cors from "cors";
import { guides, techQuestion } from "./utilities/createQuestions.mjs";
dotenv.config();

const port = process.env.PORT || 9000;
const corsOptions = {
    origin: 'https://statuesque-daffodil-497f00.netlify.app', // Replace with allowed origin(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If credentials are used
  };

const app = express();
// app.use(cors());
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/sgdms', route);

const serverStart = async () => {
    await connectDB();  //connecting to database
    app.listen(port, () => console.log(`Connected to server at port no. ${port}`));     //listening incoming request
    try {
        await techQuestion();
        await guides();
    } catch (error) {
        console.log('error creating db questions.', error);
    }
}

serverStart();

//testing route

app.get("/", (req, res) => {
    console.log("Chatbot running..!");
    res.status(200).json({ msg: "Welcome to SGDMS chatbot" });
})








