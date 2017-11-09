const mongoose = require('mongoose');



var SubjectSchema = new mongoose.Schema({
  subject: {
  type: String
  }

})


var Subject = mongoose.model('Subject', SubjectSchema)

module.exports = {
  Subject}
