import express from "express";
import { project_db } from "../model/project_model.mjs";
import { responseHandler } from "../utilities/responseHandler.mjs";
import axios from "axios";

const chatbot = 'https://testbot-680845.zapier.app/'
const route = express.Router();
//testing route

route.get("/", (req, res) => {
    console.log("Chatbot running..!");
    res.status(200).json({ msg: "Welcome to ZN chatbot" });
})


//add new project details
route.post('/project', async (req, res) => {
    const { projectName, projectCode, questions } = req.body;
    console.log(req.body)
    try {
        const newProject = new project_db({ projectName, projectCode, questions });
        const savedProject = await newProject.save();
        console.log(savedProject);
        responseHandler.success('New project details added!', 201, null, res);
    } catch (error) {
        console.error(error);
        responseHandler.error('Project details not saved!', 500, res);
    }
});

//add questions using project code
route.post('/question', async (req, res) => {
    const { projectCode } = req.query;
    const { questions } = req.body;
    console.log(projectCode, questions)
    try {
        const updatedFile = await project_db.findOneAndUpdate(
            {  }, // find condition
            { $push: { questions: { $each: questions } } }, // update operation
            { 
                new: true, // return the updated document
                runValidators: true // run schema validators on update
            }
        );
        // await project_db.findOneAndUpdate(
        //     {
        //         projectCode
        //     },
        //     {
        //         $push: { questions }
        //     },
        //     {
        //         new: true
        //     });
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
        const viewFile = await project_db.find({ projectCode })
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

//get question and id
route.get('/questions',async (req, res) => {
    const { projectCode } = req.query;
    console.log("viewing faq: ", projectCode);
    try {
        // const viewFile = await project_db.find({ projectCode: projectCode }, { 'questions': 1 })
        const viewFile = await project_db.find(
            { projectCode },
            {
                "_id": 0,
                "questions.question": 1,
                "questions._id": 1
            }
        )
        if (!viewFile)
            responseHandler.error('Questions not found.', 500, res);

        responseHandler.success('Questions fetched successfully', 20, viewFile, res);
    } catch (error) {
        console.error(error);
        responseHandler.error('server error', 500, res)
    }
})

//to create route for updating questions, fetching questions, deleting questions



// for zapier test
route.get('/zapierBot', async (req, res) => {
        try {
          const response =  axios.get(chatbot);
          res.json({message: "shit's working yo", data: response.data});
        } catch (error) {
            console.log('Something went wrong', error)
          res.status(500).send("Error fetching content.");
        }
})


//new route to add technical problem question

export default route;