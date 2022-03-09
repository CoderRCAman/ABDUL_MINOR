const mongoose = require('mongoose') ;
const staffSchema = new mongoose.Schema({
    staff_name : {
        type: String, 
        required:true
    }, 
    staff_email : {
        type: String, 
        required:true,
        validate: {
            validator: function (v) {
              return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
                v
              );
            },
            message: (props) => `${props.value} is not valid email`,
          },
        unique:true
    }, 
    school_name : {
        type: String, 
        required:true
    },
    staff_role : {
        type : String ,
        required:true 
    },
    staff_description : {
        type:String ,
        required:true 
    },
    staff_phone : {
        type : String ,
        required:true ,
        minlength : [10,'Phone number has to be atleast 10 digit long'],
        maxlength :[12,'Phone number cannot exceed 12 digit long']
    }
}) 

module.exports = mongoose.model('staff',staffSchema) ;