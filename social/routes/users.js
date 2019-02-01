var express = require('express');
var router = express.Router();
var userController = require('../controller/users/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/home')
});

router.get('/home',userController.home)

router.put('/home/:id',userController.homePut)

router.put('/home/addFriend/:id',userController.addFriendPut)

router.post('/home/post',userController.addPosts)

router.put('/home/like/:id/:id1/:decision',userController.addLike)
module.exports = router;
