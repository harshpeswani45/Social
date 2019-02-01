const mongoose = require('mongoose')

var usersSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    Name : {type : String,required:true},
    FriendRequest : {type : Array,required:true},
    FriendRequestRec : {type : Array,required:true},
    Friends : {type : Array,required:true}
})

var db = mongoose.model('friendInformation',usersSchema)
module.exports = db