const mongoose = require('mongoose');



var ClassSchema = new mongoose.Schema({
  class: {
  type: String
},
 subject: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Subject'
 }]

})


var Class = mongoose.model('Class', ClassSchema)

module.exports = {
  Class}
