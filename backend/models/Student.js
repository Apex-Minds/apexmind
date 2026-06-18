const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId:     { type: String, unique: true },
  class:         { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  dateOfBirth:   Date,
  guardianName:  String,
  guardianPhone: String,
  address:       String,
}, { timestamps: true });
module.exports = mongoose.model('Student', StudentSchema);
