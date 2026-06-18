const mongoose = require('mongoose');
const SubjectSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  code:    { type: String, unique: true },
  sessions: { type: Number, default: 0 },
  sclassName: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });
module.exports = mongoose.model('Subject', SubjectSchema);
