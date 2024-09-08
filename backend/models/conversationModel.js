import mongoose from  'mongoose'


const conversationModel =  new mongoose.Schema({

    partcipants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"message",

    }],

    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"message",
    }]
}, {timestamps:true})

export const Conversation =  mongoose.model("conversation",conversationModel)