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
                "_id": 1,
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

/*

//add questions using project code 
route.put('/question', async (req, res) => {
    // const { projectCode } = req.query;
    const { technical, tutorial } = req.body;
    console.log(technical, tutorial)
    try {
        const updatedFile = await chatbot.project_db.findOneAndUpdate(
            { projectName: "SGDMS" }, // find condition
            {
                $push: {
                    technical: { $each: technical },
                    tutorial: { $each: tutorial }
                },
            }, // update operation
            {
                new: true, // return the updated document
                runValidators: true // run schema validators on update
            }
        );

        console.log(updatedFile);
        if (updatedFile)
            responseHandler.success('Questions added suessfully', 201, null, res);
        else
            responseHandler.error('Questions not added.', 500, res);
    } catch (error) {
        console.error(error);
        responseHandler.error('server error', 500, res)
    }
})


//view faq using project_code
route.get('/questionList', async (req, res) => {
    const { projectCode } = req.query;
    console.log('questionList', projectCode)
    try {
        const viewFile = await chatbot.project_db.find({ projectCode })
        console.log(viewFile);
        // if (viewFile)
        //     responseHandler.success('Questions fetched successfully', 20, viewFile, res);
        // else
        //     responseHandler.error('Questions not found.', 500, res);
        res.json(viewFile)
    } catch (error) {
        console.error(error);
        responseHandler.error('server error', 500, res)
    }
})

*/

export default route;


//to create route for updating questions, fetching questions, deleting questions

//new route to add technical problem question
