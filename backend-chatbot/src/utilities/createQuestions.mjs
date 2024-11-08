import { sgdmsChatbot } from "./question.mjs";
import { chatbot } from "../model/project_model.mjs";


export const techQuestion = async () => {
    try {
        // check db for questions 
        const check = await chatbot.technical_db.find();
        if(check){
            console.log('questions already exists')
        }else{
            const tech = await chatbot.technical_db.insertMany(sgdmsChatbot.technical);
            if (!tech)
                console.error("error creating technical db")
        }
        console.log('sgdms tech problems-solutions created!')

    } catch (error) {
        console.error(error);
    }
};

export const guides = async () => {

    try {
        // check db for questions 
        const check = await chatbot.tutorial_db.find();
        if(check){
            console.log('questions already exists')
        }else{
            const tech = await chatbot.tutorial_db.insertMany(sgdmsChatbot.tutorial);
            if (!tech)
                console.error("error creating tutorial db")
        }
        console.log('sgdms tech problems-solutions created!')

    } catch (error) {
        console.error(error);
    }
};

/*
export async function techQuestion () {
    console.log('pre-defined questions',sgdmsChatbot.technical)
    try {
        const tech = await chatbot.technical_db.insertMany(technical);
        console.log('tech=> ', tech);
        if(!tech)
            responseHandler.error("error creating technical db",500,null,res);
        responseHandler.success('sgdms tech problems-solutions created!', 201, tech, res);
    } catch (error) {
        console.error(error);
        responseHandler.error("Questions not created in db!", 500, error, res);
    }
}

export async function guides () {
    console.log('pre-defined questions',sgdmsChatbot.tutorial)

    try {
        const guide = await chatbot.technical_db.insertMany(tutorial);
        console.log('guide_created=> ',  guide);
        if(!guide)
            responseHandler.error("error creating tutorial db",500,null,res);
        responseHandler.success('sgdms guides created!', 201, guide, res);
    } catch (error) {
        console.error(error);
        responseHandler.error("Questions not created in db!", 500, error, res);
    }
}
    */