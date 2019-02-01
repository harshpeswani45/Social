module.exports = function(req,res){
  req.session.username = undefined
  res.redirect('/login')  
}