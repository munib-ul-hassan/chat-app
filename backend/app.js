const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(cors())

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversation = require("./routes/conversation");
const message = require("./routes/message");

require("dotenv").config();
// app.use("/", (req,res,next) => {  
//   next()
// });

const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err, data) => {
    if (!err) {
      console.log("Connected to MongoDB");
    } else {
      console.log(err);
    }
  }
);
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.static("public"));
//routes
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
  console.log("sds");
  res.status(202).cookie("Name", "Munib", { sameSite: 'strict', path: '/', expires: new Date(new Date().getTime() + 5 * 1000), httpOnly: true ,secure:true}).send("Cookie sended")
})
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversation", conversation);
app.use("/api/message", message);

//middleware
// app.use(bodyParser.json())

// app.use(express.bodyParser());


app.listen(8800, () => {
  console.log("Server is running");
});
