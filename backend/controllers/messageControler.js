import { conversation } from "../models/conversationModel.js"

export const sendMessage  = async (req,res)=>{
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const {message} =  req.body

        let gotConversation = await conversation.findOne({
            partcipants : {$all : [senderId , receiverId]}
        })

        if(!gotConversation){
               gotConversation = await conversation.create({
                partcipants: [senderId,receiverId],
                
               })
        }

        const newMessage = await message.create({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }

        await gotConversation.save( )
        //SOCKET IO
    } catch (error) {
        console.log(error)
    }
}