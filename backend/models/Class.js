const mongoose = require('mongoose');
const ClassSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  numericID:    String,
  section:      String,
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  subjects:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  students:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });
module.exports = mongoose.model('Class', ClassSchema);
