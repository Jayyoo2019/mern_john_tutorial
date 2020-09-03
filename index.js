const express = require('express');
const app = express();
const port = 5005;
const {User} = require("./models/User");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connection = mongoose.connection;
const config = require('./config/key');
//body-parser에 옵션 부여
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/',(req,res)=>{
    res.send("app.post ////");
})
app.get('/', (req,res)=>res.send("hello mern!?12123332"));


//MongoDB 연결 (const uri = process.env.ATLAS_URI;)
mongoose.connect(config.mongoURI, 
{ useNewUrlParser: true, useCreateIndex: true }
);
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//회원가입을 위한 route
app.post('/resister', (req,res)=>{
    const user = new User(req.body)

    user.save((err, userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})
app.listen(port, () => console.log(`server is running on ${port}`));


