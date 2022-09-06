const router = require("express").Router();
const Message = require("../models/message");
router.post("/", async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    if (!(conversationId && sender && text)) {
      res.status(201).json({
        success: false,
        message: "All input is required",
      });
    } else {
      const message = new Message(req.body);
      const data = await message.save();
      console.log(data);
      if (data) {
        res.status(200).json({
          success: true,
          data: data,
          message: "message sent successfully ",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Message sending failed",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
router.get("/:conversationId", async (req, res) => {
    try {
      const data = await Message.find({
        conversationId: req.params.conversationId
      });
      if (data.length > 0) {
        res.status(200).json({
          success: true,
          data: data,
            message: "Messages fetch Successfully",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No any messages exist",
        });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  });
module.exports = router;
