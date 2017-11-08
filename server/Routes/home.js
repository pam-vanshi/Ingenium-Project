var express = require('express')
var router = express.Router()
const _ = require('lodash')
var {User} = require("../models/users.js")

router.get('/',function(req,res,next){
  console.log("home page is working");
  res.send("This is working")
})

router.post('/signup', function(req,res,next){
  var body = _.pick(req.body,['name','email','username','password'])
  var user = new User(body)

  user.save().then((user) => {
    res.send(user)
  })
})


module.exports = router
