var express = require('express');
var router = express.Router();
var userController = require('../controller/index/index')

/* GET home page. */
router.get('/',function(req,res){
  res.redirect('/login')
})

router.get('/login',userController.login)

router.post('/register',userController.register)

router.post('/login',userController.loginPost)

router.get('/logout',userController.logout)

module.exports = router;
