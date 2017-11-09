var express = require('express')
var router = express.Router()
const _ = require('lodash')
var {User} = require("../models/users.js")

router.get('/',function(req,res,next){
  console.log("home page is working");
  res.send("This is working")
})

router.post('/signup', function(req,res,next){
  var body = _.pick(req.body,['name','username','password','email'])
  var user = new User(body)

  user.save().then((user) => {
    return user.generateAuthToken()
  }).then((token) =>{
      res.header('x-auth',token).send(user)
    }).catch((e) => {
      res.status(400).send(e)
    })
    console.log(req.body);

})

router.post('/login', function(req,res,next){
  var body = _.pick(req.body, ['username','password'])
  User.findByCredentials(body.username, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});


module.exports = router
