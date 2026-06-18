const Mark = require('../models/Mark');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const { success, fail } = require('../utils/responseHelper');

exports.enter = async (req, res) => {
  try { success(res, await Mark.create({ ...req.body, enteredBy: req.user._id }), 201); }
  catch(e){ fail(res,e.message,500); }
};

exports.bulkEnter = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id });
    const { subjectId, marksData = [], examType = 'quiz', classId, totalMarks = 100, term = '' } = req.body;
    const studentIds = marksData.map((entry) => entry.studentId || entry.student).filter(Boolean);
    const students = await Student.find({ _id: { $in: studentIds } }).populate('class');

    const docs = marksData.map((entry) => {
      const studentId = entry.studentId || entry.student;
      const student = students.find((item) => String(item._id) === String(studentId));
      return {
        student: studentId,
        subject: subjectId,
        class: student?.class?._id || student?.class || classId,
        examType,
        score: Number(entry.marks ?? entry.score ?? 0),
        totalMarks,
        term,
        enteredBy: teacher?._id || req.user._id,
      };
    });

    const saved = await Mark.insertMany(docs);
    success(res, saved, 201);
  } catch(e){ fail(res,e.message,500); }
};

exports.getByStudent = async (req, res) => {
  try { success(res, await Mark.find({ student: req.params.studentId }).populate('subject')); }
  catch(e){ fail(res,e.message,500); }
};
exports.getByClass = async (req, res) => {
  try { success(res, await Mark.find({ class: req.params.classId }).populate('student subject')); }
  catch(e){ fail(res,e.message,500); }
};
