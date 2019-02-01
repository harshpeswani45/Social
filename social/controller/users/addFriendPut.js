var friendInfo = require('../../models/friends')

module.exports = function(req,res){
  var username = req.params.id
  friendInfo.find({Name : req.session.username},function(err,result){
    if(err)
      console.log(err)
    else{
        
           for(var i=0 ; i<result[0].FriendRequestRec.length ;i++){
        
        if(result[0].FriendRequestRec[i].Name == username){
          
          result[0].FriendRequestRec.splice(i,1);
        }
      }
      result[0].Friends.push({Name : username})
      friendInfo.update({Name : req.session.username},{$set:{FriendRequestRec : result[0].FriendRequestRec,Friends : result[0].Friends}},function(err,result){
        if(err)
          console.log(err)
        else{
          
          res.end()
        }
      })
    }

  })
  friendInfo.find({Name : username},function(err,result){
    if(err)
      console.log(err)
    else{
      
      result[0].Friends.push({Name : req.session.username})
      friendInfo.update({Name : username},{$set:{Friends : result[0].Friends}},function(err,result){
        if(err)
          console.log(err)
        else{
          res.end()
        }
      })
    }
  })
}