const router = require("express").Router();
const conversation = require("../models/conversation");
// new conversation
router.post("/",async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    console.log(senderId, receiverId);
    if (!(senderId && receiverId)) {
        console.log("111111");
      res.status(201).json({
        success: false,
        message: "All input is required",
      });
    } else {
        console.log("22222");

      const newconversation = new conversation({
        members: [req.body.senderId, req.body.receiverId],
      });
      const data =await  newconversation.save();
      if (data) {
        res.status(200).json({
          success: true,
          data: data,
          message: "Conversation Successfully established",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Conversation failed",
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
//get conversation
router.get("/:userId", async (req, res) => {
  try {
    const data = await conversation.find({
      members: { $in: [req.params.userId] },
    });
    if (data.length > 0) {
      res.status(200).json({
        success: true,
        data: data,
        message: "Conversation fetch Successfully",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "No any conversation exist",
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
