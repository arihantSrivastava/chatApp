import { Conversation } from "../models/conversationModel.js"
import { Message } from "../models/messageModel.js"

export const sendMessage  = async (req,res)=>{
    try {
        const senderId = req.id
        console.log(senderId)
        const receiverId = req.params.id
        const {message} =  req.body

        let gotConversation = await Conversation.findOne({
            partcipants : {$all : [senderId , receiverId]}
        })

        if(!gotConversation){
               gotConversation = await Conversation.create({
                partcipants: [senderId,receiverId],
                
               })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })
     
        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }

        await gotConversation.save( )

        return res.status(201).json({
            "message": "Message sent succesfully"
        })
    
        //SOCKET IO
    } catch (error) {
        console.log(error)
    }
}