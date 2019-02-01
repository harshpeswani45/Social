var postInformation = require('../../models/posts')
var mongoose = require('mongoose')

module.exports = function(req,res){
  var mainid = req.params.id
  var userid = req.params.id1
  var decision = req.params.decision
  postInformation.findById(userid).exec().then(function(result){
    console.log(result)
    for(var i=0;i<result.Post.length;i++){
      if(result.Post[i]._id == mainid){
        if(decision == 'like')
          result.Post[i].like.push({Name : req.session.username})
        else{
          for(var j=0 ; j < result.Post[i].like.length ; j++){
              if(result.Post[i].like[j].Name == req.session.username){
                result.Post[i].like.splice(i,1)
              }
          }
        }
        postInformation.update({Name : result.Name},{$set:{Post : result.Post}},function(err,result){
          if(err)
            console.log(err)
          else{
            res.end()
          }
        })
        break
      }  
    }
    
    
  }).catch(function(err){
    console.log(err)
  })
  
}