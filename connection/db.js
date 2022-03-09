//this module connects out database 
const mongoose = require("mongoose") ;
const MONGO_URI = process.env.MONGO_URI || '' ; //holds our database URI or mongodb connection 
mongoose.connect(MONGO_URI ,{
    useNewUrlParser : true ,
   	useUnifiedTopology:true
})
.then((success)=>{
    console.log("Database connection established...") ;
})
.catch(err=>{
    console.log("Failed to connect to database>>>>>>>",err) ;
})
