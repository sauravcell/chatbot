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
        await chatbot.technical_db.insertMany(sgdmsChatbot.technical);
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
        await chatbot.tutorial_db.insertMany(sgdmsChatbot.tutorial);
        console.log('sgdms tech problems-solutions created!')

    } catch (error) {
        console.error(error);
    }
};