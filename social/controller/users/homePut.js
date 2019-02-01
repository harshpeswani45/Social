var friendInfo = require('../../models/friends')
var loginData = require('../../models/users')
var mongoose = require('mongoose')

module.exports = function(req,res){
  var username = req.params.id
  console.log(username+"LWDSASDAd")
  loginData.find({},function(err,result){
    if(err)
      console.log(err)
    else{
        friendInfo.find({Name : req.session.username},function(err,result){
        if(err)
          console.log(err)
        else{
          if(result.length == 0){
            var data = new friendInfo({
              _id : new mongoose.Types.ObjectId(),
              Name : req.session.username,
              FriendRequest : [{Name : username}],
              FriendRequestRec:[],
              Friends : []
            })
            data.save(function(err,result){
              if(err)
                console.log(err)
              else
                res.end()
              
            })
          }
          else{
            result[0].FriendRequest.push({Name : username})
            friendInfo.update({Name : req.session.username},{$set:{FriendRequest : result[0].FriendRequest}},function(err,result){
              if(err)
                console.log(err)
                  else
                    res.end()
              })
          
           
           
          }

        }
      })
      friendInfo.find({Name : username},function(err,result){
        if(err)
          console.log(err)
        else{
          if(result.length == 0){
            var data = new friendInfo({
              _id : new mongoose.Types.ObjectId(),
              Name : username,
              FriendRequest : [],
              FriendRequestRec:[{Name : req.session.username}],
              Friends : []
            })
            data.save(function(err,result){
              if(err)
                console.log(err)
            })

          }
          else{
            result[0].FriendRequestRec.push({Name : req.session.username})
            friendInfo.update({Name : username},{$set:{FriendRequestRec : result[0].FriendRequestRec}},function(err,result){
              if(err)
                console.log(err)
            })
          }
        }

      })
    }
  })

}