const mongoose = require('mongoose');
const MarkSchema = new mongoose.Schema({
  student:    { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject:    { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class:      { type: mongoose.Schema.Types.ObjectId, ref: 'Class',   required: true },
  examType:   { type: String, enum: ['quiz', 'midterm', 'final', 'assignment'], required: true },
  score:      { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  term:       String,
  enteredBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });
module.exports = mongoose.model('Mark', MarkSchema);
