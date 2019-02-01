const mongoose = require('mongoose')

var postsSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    Name : {type : String,required:true},
    Post : {type: Array,required:true},
    
})

var db = mongoose.model('postInformation',postsSchema)
module.exports = db