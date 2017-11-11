var express = require('express')
var router = express.Router()
const _ = require('lodash')
var {User} = require("../models/users.js")
var {Chapter} = require("../models/question/chapter.js")
var {Question} = require("../models/question/question.js")
var {Class} = require("../models/question/class.js")
var {Subject} = require("../models/question/subject.js")
var {authenticate} = require("../middleware/authenticate.js")

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

router.get('/user/me', authenticate, (req,res) => {
  res.send(req.user)
})
router.delete('/logout',authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
  })
router.post('/question', function(req,res,next){
  var body = _.pick(req.body, ['description','chapter1','optionA','optionB','optionC','optionD','correctOption','level'])
   var question = new Question(body)
   Chapter.findOne({name:body.chapter1}).then((chapter1) => {
     question.chapter.push(chapter1)
     question.save().then((question) => {
       res.send(question)
     }).catch((e) => {
       res.status(400).send(e)
     })
   })
})

router.post('/class', function(req,res,next){
  var body = _.pick(req.body, ['class'])
  var classes = new Class(body)
  classes.save().then((classes) => {
    res.send(classes)
  })
  })

  router.post('/subject', function(req,res,next){
    var body = _.pick(req.body, ['subject'])
    var subject = new Subject(body)
    subject.save().then((subject) => {
      res.send(subject)
    })
  })

  router.post('/chapter', function(req,res,next){
    var body = _.pick(req.body, ['name','class','subject'])
    var chapter = new Chapter()
    chapter.name = body.name
    Class.findOne({"class":body.class}).then((classes) => {
      chapter.class.push(classes)
      Subject.findOne({"subject":body.subject}).then((subject) => {
        chapter.subject.push(subject)
        chapter.save().then((chapter) => {
          res.send(chapter)
        })
              })

    })
  })



module.exports = router
