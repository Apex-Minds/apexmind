const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacherId: { type: String, unique: true },
  subjects:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  classes:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  phone:     String,
}, { timestamps: true });
module.exports = mongoose.model('Teacher', TeacherSchema);
