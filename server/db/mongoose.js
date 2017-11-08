var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_JADE_URI || 'mongodb://localhost:27017/Project',{
  useMongoClient : true
})



module.exports = {
  mongoose
}
