import express from "express";
import { chatbot } from "../model/project_model.mjs";
import { responseHandler } from "../utilities/responseHandler.mjs";


// const chatbot = 'https://testbot-680845.zapier.app/'
const route = express.Router();

//add technical questions
route.post(`/technical`, async (req, res) => {
    const { technical } = req.body;
    console.log('Request=> ', technical);
    try {
        const questions = await chatbot.technical_db.insertMany(technical);
        console.log(questions);
        responseHandler.success('Technical questions added!', 201, questions, res);
    } catch (error) {
        console.error(error);
        responseHandler.error("Questions not inserted!", 500, error, res);
    }
});

//add tutorial guides
route.post(`/tutorial`, async (req, res) => {
    const { tutorial } = req.body;
    console.log('Request=> ', tutorial);
    try {
        const questions = await chatbot.tutorial_db.insertMany(tutorial);
        console.log(questions);
        responseHandler.success('Tutorial questions added!', 201, questions, res);
    } catch (error) {
        console.error(error);
        responseHandler.error("Questions not inserted!", 500, error, res);
    }
});


//get technical question and id
route.get('/technicalQuestion', async (req, res) => {
    try {
        const questions = await chatbot.technical_db.find(
            {},
            {
                "answer": 1,
                "question": 1,
            }
        );
        console.log('Technical issues => ', questions)
        if (!questions)
            responseHandler.error('Questions not found.', 500, res);
        responseHandler.success('Questions fetched successfully', 200, questions, res);
    } catch (error) {
        console.error(error);
        responseHandler.error('Questions not found', 500, res)
    }
});

//get tutorial question and id
route.get('/tutorialQuestion', async (req, res) => {
    try {
        const questions = await chatbot.tutorial_db.find(
            {},
            {
                "answer": 1,
                "question": 1,
            }
        );
        console.log('Tutorial guides=> ', questions)
        if (!questions)
            responseHandler.error('Guides not found.', 500, res);
        responseHandler.success('Guides fetched successfully', 200, questions, res);
    } catch (error) {
        console.error(error);
        responseHandler.error('Error in fetching guides!', 500, res)
    }
});

//route to get last update details
route.get('/update', async (req, res) => {
    try {
        const data = await chatbot.update_db.find({}, {
            "description": 1
        });
        console.log('updates',data);
        if (!data)
            responseHandler.error('updates not found.', 500, res);
        responseHandler.success('updates fetched successfully', 200, data, res);
    } catch (error) {
        console.error(error);
        responseHandler.error('Error in fetching update details!', 500, res)
    }
})

export default route;


