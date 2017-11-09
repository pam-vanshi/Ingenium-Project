const mongoose = require("mongoose")

var QuestionSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true
  },
  level: {
    type: String
  },
  optionA: {
    type: String
  },
  optionB: {
    type: String
  },
  optionC: {
    type: String
  },
  optionD: {
    type: String
  },
  correctOption: {
    type: String
  },
  chapter: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  }]
})

var Question = mongoose.model('Question', QuestionSchema)

module.exports = {Question}
