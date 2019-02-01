var loginData = require('../../models/users')
var friendInfo = require('../../models/friends')
var postInfo = require('../../models/posts')

module.exports = function(req,res){
  
  if(req.session.username != undefined){
    loginData.find({Name : req.session.username},function(err,result){
      var resultCone = result
      if(err)
        console.log(err)
      else{
        loginData.find({},function(err,result){
          if(err)
            console.log(err)
          else{
            var posts=[]
            postInfo.find({Name : req.session.username},function(err,result){
              if(err)
                console.log(err)
              else{
                if(result.length!=0)
                  posts.push(result)
              }
            })
            var oldusers=result
            var newusers=[]
            friendInfo.find({Name:req.session.username},function(err,result){
              if(err)
                console.log(err)
              else{
                if(result.length!=0){
                  
                  for(var i=0 ;i<oldusers.length;i++){
                    for(var j=0;j<result[0].FriendRequest.length;j++){
                      //console.log(oldusers[i].Name)
                      //console.log(result[0].FriendRequest[j].Name)
                      if(oldusers[i].Name ==result[0].FriendRequest[j].Name ){
                        
                        break
                      }
                    }
                    if(j == result[0].FriendRequest.length)
                      newusers.push({Name : oldusers[i].Name})
                  }
                  var temp = result[0].Friends.length
                  var j=0
                  var resultClone= result[0]
                  
                  for( var i=0 ; i<result[0].Friends.length;i++){
                    
                    postInfo.find({Name : result[0].Friends[i].Name},function(err,result){
                      if(err)
                        console.log(err)
                      else{
                        j++
                        if(result.length!=0){
                         
                          posts.push(result)
                          
                        }
                        if(j==temp)
                          {
                            if(1){
                              console.log(posts)
                              res.render('home',{username : req.session.username,img : resultCone[0].Image, users : newusers,friendReq : resultClone.FriendRequestRec,friend:resultClone.Friends , Posts : posts})  
                            }
                            else
                              res.render('home',{username : req.session.username,img : resultCone[0].Image, users : newusers,friendReq : [],friend:[],Posts:[]}) 
          
                          }
                      }
                    })
                  }
                  if(result[0].Friends.length==0){
                    console.log( resultClone.FriendRequestRec+"flkgmdflk")
                    res.render('home',{username : req.session.username,img : resultCone[0].Image, users : newusers,friendReq :  resultClone.FriendRequestRec,friend:[],Posts:[]})
                  }
                }
                else{
                  newusers=oldusers
                  
                  res.render('home',{username : req.session.username,img : resultCone[0].Image, users : newusers,friendReq :[],friend:[],Posts:[]}) 
                }
   
              
                       
                
                }
            })
           
             
          } 
        })
              }
    })
    
    
  }

  



  else{
    res.redirect('/login')
  }
}