
const mongoose = require('mongoose')

var ChapterSchema = new mongoose.Schema({
  name: {
    type: String
  },
  subject: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  class: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }]
})

var Chapter = mongoose.model('Chapter', ChapterSchema)

module.exports = {
  Chapter
}
