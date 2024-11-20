import mongoose, { Schema, Types } from "mongoose";

const questionSchema = new mongoose.Schema({    //schema for storing questions with answer
    _id: {
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
    createdAt: {
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const update = new mongoose.Schema({
    version: {
        type: String,
        required: true,
    },

    releaseDate: {
        type: String,
        required: true,
    },

    description: {
        type: String
    }
});

const technical_db = mongoose.model('technical', technical);
const tutorial_db = mongoose.model('tutorial', tutorial);
const update_db = mongoose.model('update', update);
export const chatbot = {
    technical_db,
    tutorial_db,
    update_db,
}