import mongoose, { Types } from "mongoose";

const questionSchema = new mongoose.Schema({    //schema for storing questions with answer
    _id:{
        type: mongoose.Types.ObjectId,
        default: new Types.ObjectId()
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const projectSchema = new mongoose.Schema({    //schema for storing different projects faq
    projectName: {
        type: String,
        // required: true,
        // unique: true
    },
    projectCode: {
        type: String,
        // required: true,
        // unique: true
    },
    technical: [{
        questionSchema
    }],
    tutorial: [{
        questionSchema
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const technical = new mongoose.Schema({    //schema for storing TECHNICAL questions with answer
    // _id:{
    //     type: mongoose.Types.ObjectId,
    //     default: new Types.ObjectId()
    // },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const tutorial = new mongoose.Schema({    //schema for storing TUTORIAL questions with answer
    // _id:{
    //     type: mongoose.Types.ObjectId,
    //     default: new Types.ObjectId()
    // },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const project_db = mongoose.model('sgdms_chatbot', projectSchema); 
const technical_db = mongoose.model('technical',technical);
const tutorial_db = mongoose.model('tutorial',tutorial);

export const chatbot = {
    project_db,
    technical_db,
    tutorial_db
}