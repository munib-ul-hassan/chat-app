const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
req.body.password = hashedPassword
    //create new user
    const newUser = new User(req.body);

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});
router.get("/getuserbyId/:id",async (req,res)=>{
  try{
    const id = req.params.id
    
     const data = await User.findOne({_id:id})
     res.status(200).json(data)
  }catch (err) {
    res.status(500).json(err)
  }
})
router.get("/getuser",async (req,res)=>{
  try{
    
    console.log(req.query.username);
     const data = await User.find({username: {$regex : `/^${req.query.username}/`}})
     console.log(data);
     res.status(200).json(data)
  }catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
