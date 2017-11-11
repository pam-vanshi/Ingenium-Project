const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    minlength: 5,

    //required: true,
    isAsync: true,
    validate: {
      isAsync:false,
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  username: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    //required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      //required: true
    },
    token: {
      type:String,
      //required: true
    }
  }]

})

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['name','email','_id'])
}

UserSchema.methods.generateAuthToken = function() {
  var user= this;
  var access = 'auth';

  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();
  user.tokens.push({
    access: access,
    token: token
  })
  return user.save().then(() => {
    return token
  })
}
UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({

    $pull : {
      tokens: {token}
    }
  });
};
UserSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt, (err,hash) => {
           user.password = hash;
             next()
      })
    })

  }else {
    next()
  }

})

UserSchema.statics.findByCredentials = function (username,password){
  var User = this;
  return User.findOne({username:username}).then((user) => {
    if(!user){ return Promise.reject()}

    return new Promise((resolve,reject) => {
      bcrypt.compare(password,user.password,(err, res) => {
        if(res){
          resolve(user)
        }else {reject()}
      })
    })
  })
}
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


var User = mongoose.model('User', UserSchema)

module.exports = {User}
