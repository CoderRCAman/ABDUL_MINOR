const mongoose = require('mongoose') ;
const standardSchema = new mongoose.Schema({
    standard : {
        type : String,
        maxlength:'10'
    }
}) 

module.exports = mongoose.model('standard',standardSchema) ;