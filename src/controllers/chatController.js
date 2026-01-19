import ChatMessage from "../models/ChatMessage.js";
import User from "../models/User.js";

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // 1. Message content should not be empty
    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message content cannot be empty",
      });
    }

    // 2. Sender must exist
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({
        success: false,
        message: "Sender does not exist",
      });
    }

    // 3. Receiver must exist
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver does not exist",
      });
    }

    const newMessage = await ChatMessage.create({
      senderId,
      receiverId,
      message,
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find();
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
