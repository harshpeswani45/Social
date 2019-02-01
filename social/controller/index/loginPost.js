var loginData = require('../../models/users')

module.exports = function(req,res){
  loginData.find({Name : req.body.username , Password : req.body.password},function(err,result){
    if(err)
      console.log(err)
    else{
      if(result.length != 0){
        req.session.username = req.body.username
        res.redirect('/users/home')
      }
      else{
        res.render('index',{message : 'Username And Password Incorrect'})
      }
    }
  })
}