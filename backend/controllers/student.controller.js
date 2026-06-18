const Student = require('../models/Student');
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');
const { success, fail } = require('../utils/responseHelper');

exports.getPerformance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return success(res, { marks: [], attendance: [] });

    const marks = await Mark.find({ student: student._id }).populate('subject');
    const attendance = await Attendance.find({ student: student._id }).populate('subject');

    const formattedMarks = marks.map(m => ({
      subject: m.subject?.name || 'Unknown',
      subCode: m.subject?.code || 'N/A',
      marks: m.totalMarks ? Math.round((m.score / m.totalMarks) * 100) : 0
    }));

    const attendanceMap = new Map();
    attendance.forEach((entry) => {
      const key = entry.subject?._id?.toString() || 'general';
      if (!attendanceMap.has(key)) {
        attendanceMap.set(key, {
          subject: entry.subject?.name || 'General Attendance',
          subCode: entry.subject?.code || 'GEN',
          present: 0,
          absent: 0,
          late: 0,
          total: 0,
        });
      }
      const bucket = attendanceMap.get(key);
      bucket.total += 1;
      if (entry.status === 'present') bucket.present += 1;
      if (entry.status === 'absent') bucket.absent += 1;
      if (entry.status === 'late') bucket.late += 1;
      bucket.percentage = bucket.total === 0 ? 0 : Math.round((bucket.present / bucket.total) * 100);
    });

    const formattedAttendance = Array.from(attendanceMap.values());

    success(res, { marks: formattedMarks, attendance: formattedAttendance });
  } catch(e) { fail(res, e.message, 500); }
};

exports.getMarks = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return success(res, []);
    const marks = await Mark.find({ student: student._id }).populate('subject');
    success(res, marks);
  } catch (e) { fail(res, e.message, 500); }
};

exports.getAll  = async (req, res) => { try { success(res, await Student.find().populate('user class')); } catch(e){ fail(res,e.message,500); }};
exports.getOne  = async (req, res) => { try { success(res, await Student.findById(req.params.id).populate('user class')); } catch(e){ fail(res,e.message,500); }};
exports.create  = async (req, res) => { try { success(res, await Student.create(req.body), 201); } catch(e){ fail(res,e.message,500); }};
exports.update  = async (req, res) => { try { success(res, await Student.findByIdAndUpdate(req.params.id, req.body, { new:true })); } catch(e){ fail(res,e.message,500); }};
exports.remove  = async (req, res) => { try { await Student.findByIdAndDelete(req.params.id); success(res, { message:'Deleted' }); } catch(e){ fail(res,e.message,500); }};
