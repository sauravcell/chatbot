import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({    //schema for storing questions with answer

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
        unique: true
    },
    projectCode: {
        type: String,
        // required: true,
        unique: true
    },
    technical: {
        questionSchema
    },
    turorial: {
        questionSchema
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const project_db = mongoose.model('Project', projectSchema);


 
 