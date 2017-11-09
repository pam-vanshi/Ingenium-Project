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
    res.send(user)
    console.log(req.body);
  })
})


module.exports = router
