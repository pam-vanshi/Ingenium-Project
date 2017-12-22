const express = require('express')
const path = require('path')
var {mongoose} = require('./db/mongoose.js')//for connecting to mongodb database
const _ = require('lodash')
var logger = require('morgan')
//const publicPath = path.join(__dirname, '../public');
var favicon = require('static-favicon')
var bodyParser = require('body-parser')
var {User} = require("./models/users.js")
var app = express()
var port = process.env.PORT || 3000;
//var index  = require("./Routes/home.js")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(favicon());// for ceaching
app.use(logger('dev'));//for request logs
//app.use(express.static(publicPath))
//app.use('/',index)
app.get('/',function(req,res,next){
  console.log("home page is working");
  res.send("This is working");
})

app.post('/signup', function(req,res){
  var body = _.pick(req.body,['name','find','contact','email'])
  var user = new User(body)

  user.save().then((user) => {
    console.log("user is saved");
    res.send(user)

}).catch((e) => {
     res.status(400).send("there is some error");
  })
})


app.listen(port, console.log(`server is running on ${port}`))

//module.exports = {app}
