const mongoose = require('mongoose') ;
const standardSchema = new mongoose.Schema({
    standard : {
        type : String,
        maxlength:'10'
    },
    u_id : {
        type : String ,
        required:true
    },
}) 

module.exports = mongoose.model('standard',standardSchema) ;