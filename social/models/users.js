const mongoose = require('mongoose')

var usersSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    Name : {type : String,required:true},
    Password : {type : String,required:true},
    Image : {type : String}
})

var db = mongoose.model('userInformation',usersSchema)
module.exports = db