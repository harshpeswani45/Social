var postInformation = require('../../models/posts')
var mongoose = require('mongoose')

module.exports = function(req,res){
  postInformation.find({Name : req.session.username},function(err,result){
    if(err)
      console.log(err)
    else{
      if(result.length == 0){
        var data = new postInformation({
          _id : new mongoose.Types.ObjectId(),
          Name : req.session.username,
          Post : [{_id:new mongoose.Types.ObjectId(),Desc : req.body.desc , Date : new Date(Date.now()).toLocaleString(),like : [], comments:[]}] 
        })
        data.save(function(err,result){
          if(err)
            console.log(err)
          else{
            res.redirect('/users/home')
          }
        })
      }
      else{
        result[0].Post.push({_id:new mongoose.Types.ObjectId(),Desc : req.body.desc , Date : new Date(Date.now()).toLocaleString(),like : [], comments:[]})
        
        postInformation.update({Name : req.session.username},{$set:{Post : result[0].Post}},function(err,result){
          if(err)
            console.log(err)
          else{
            res.redirect('/users/home')
          }
        })
      }
    }
  })
}