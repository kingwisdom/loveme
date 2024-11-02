import { getConnectedUsers, getIO } from "../socket/socket.server.js";
import Message from "../model/Message.js";

export const sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body
        const newMessage = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content
        })

        //TODO: send notification
        const io = getIO();
        const connectedUsers = getConnectedUsers();
        const receiverSocketId = connectedUsers.get(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", {
                message: newMessage
            });
        }

        res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went wrong", err: error.message })
    }
}

export const getConversations = async (req, res) => {
    const { conversationId: userId } = req.params
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: userId },
                { sender: userId, receiver: req.user._id }
            ]
        }).sort({ createdAt: -1 })
        console.log('messages: ', messages)
        res.status(200).json({ success: true, messages })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Something went wrong", err: error.message })
    }
}