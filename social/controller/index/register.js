var loginData = require('../../models/users')
var randomstring = require('randomstring')
var mongoose = require('mongoose')

module.exports = function(req,res){
  loginData.find({Name:req.body.username},function(err,result){
    if(err)
      console.log(err)
    else{
      if(result.length == 0){
        var image = req.files.image
       if(image == undefined){
        var image={}
        image.name = 'dummy.png'
        var userData = new loginData({
          _id : new mongoose.Types.ObjectId(),
          Name : req.body.username,
          Password : req.body.password,
          Image :image.name  
        })
        userData.save(function(err,result){
          if(err)
            console.log(err)
          else
            res.render('index',{message : 'Registered Succesfully'})
        })
        }
      else{
        var random =  randomstring.generate()   
        image.mv('./uploads/'+random+image.name,function(err){
        if(err)
          console.log(err)
        else{
          var userData = new loginData({
          _id : new mongoose.Types.ObjectId(),
          Name : req.body.username,
          Password : req.body.password,
          Image :random + image.name  
        })
        userData.save(function(err,result){
          if(err)
            console.log(err)
          else
            res.render('index',{message : 'Registered Succesfully'})
        })

      }
    })
  }

      }
      else
        res.render('index',{message:'User Already Exists'})
    }
  })
  
  
}