const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const { success, fail } = require('../utils/responseHelper');

const normalizeStatus = (status) => {
  const value = String(status || '').toLowerCase();
  if (value === 'present') return 'present';
  if (value === 'absent') return 'absent';
  return 'late';
};

exports.mark = async (req, res) => {
  try {
    const saved = await Attendance.create({
      ...req.body,
      status: normalizeStatus(req.body.status),
      markedBy: req.user._id,
    });
    success(res, saved, 201);
  }
  catch(e){ fail(res,e.message,500); }
};

exports.markBulk = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id });
    const { subjectId, date, attendanceData = [] } = req.body;

    const studentIds = attendanceData.map((entry) => entry.student).filter(Boolean);
    const students = await Student.find({ _id: { $in: studentIds } }).populate('class');

    const docs = attendanceData.map((entry) => {
      const student = students.find((item) => String(item._id) === String(entry.student));
      return {
        student: entry.student,
        class: student?.class?._id || student?.class || req.body.classId,
        subject: subjectId,
        date,
        status: normalizeStatus(entry.status),
        markedBy: teacher?._id || req.user._id,
      };
    });

    const saved = await Attendance.insertMany(docs);
    success(res, saved, 201);
  } catch(e){ fail(res,e.message,500); }
};

exports.getByClass = async (req, res) => {
  try { success(res, await Attendance.find({ class: req.params.classId }).populate('student subject')); }
  catch(e){ fail(res,e.message,500); }
};
exports.getByStudent = async (req, res) => {
  try { success(res, await Attendance.find({ student: req.params.studentId }).populate('subject class')); }
  catch(e){ fail(res,e.message,500); }
};
