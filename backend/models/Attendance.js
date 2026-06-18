const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  student:  { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class:    { type: mongoose.Schema.Types.ObjectId, ref: 'Class',   required: true },
  subject:  { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  date:     { type: Date, required: true },
  status:   { type: String, enum: ['present', 'absent', 'late'], required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });
module.exports = mongoose.model('Attendance', AttendanceSchema);
