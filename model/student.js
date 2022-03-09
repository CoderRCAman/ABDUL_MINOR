const mongoose = require("mongoose"); 
const studentSchema = new mongoose.Schema({
    u_id : {
        type : String ,
        required:true
    },
    s_name : {
        type: String , 
        required:true ,
        minLength: [6, "Too short student name"],
        maxLength: [40, "Too large student name"],
    },
    s_roll : {
        type : String ,
        required:true
    },
    school_name:{
        type : String , 
        required:true ,
        minLength: [6, "Too short school name"],
        maxLength: [40, "Too large school name"],
    },
    date_of_birth : {
        type : String , 
        required:true ,
    },
    s_phone : {
        type: String, 
        required:true,
        minLength: [10, "Too short phone"],
        maxLength: [12, "Too large phone"],
    },
    s_address : {
        type: String, 
        required:true
    },
    s_standard : {
        type: String, 
        required:true
    }
}); 

module.exports = mongoose.model('student',studentSchema) ;