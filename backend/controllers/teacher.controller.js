const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const { success, fail } = require('../utils/responseHelper');

const formatStudent = (student) => ({
  _id: student._id,
  user: student.user,
  class: student.class,
  studentId: student.studentId,
  rollNum: student.studentId,
  name: student.user?.name || '',
  email: student.user?.email || '',
});

const formatTeacher = (teacher) => ({
  _id: teacher._id,
  user: teacher.user,
  subjects: teacher.subjects || [],
  classes: teacher.classes || [],
  teacherId: teacher.teacherId,
  name: teacher.user?.name || '',
  email: teacher.user?.email || '',
  teachSubject: teacher.subjects?.[0] || null,
  schoolClass: teacher.classes?.[0] || null,
  phone: teacher.phone || '',
});

exports.getProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id }).populate('user subjects classes');
    success(res, teacher ? formatTeacher(teacher.toObject()) : null);
  } catch(e) { fail(res, e.message, 500); }
};

exports.getClassStudents = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id });
    if (!teacher || !teacher.classes || teacher.classes.length === 0) {
      return success(res, []);
    }
    const students = await Student.find({ class: { $in: teacher.classes } }).populate('user class');
    success(res, students.map((student) => formatStudent(student.toObject())));
  } catch(e) { fail(res, e.message, 500); }
};

exports.getSubjects = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id }).populate('subjects classes');
    const subjects = (teacher?.subjects || []).map((subject) => ({
      _id: subject._id,
      subName: subject.name,
      subCode: subject.code || '',
      sessions: subject.sessions || 0,
      sclassName: subject.sclassName || null,
    }));
    success(res, subjects);
  } catch (e) { fail(res, e.message, 500); }
};

exports.getAll  = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('user subjects classes');
    success(res, teachers.map((teacher) => formatTeacher(teacher.toObject())));
  } catch(e){ fail(res,e.message,500); }
};

exports.getOne  = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('user subjects classes');
    success(res, teacher ? formatTeacher(teacher.toObject()) : null);
  } catch(e){ fail(res,e.message,500); }
};

exports.create  = async (req, res) => {
  try {
    const TeacherModel = require('../models/Teacher');
    const User = require('../models/User');
    const Subject = require('../models/Subject');
    const Class = require('../models/Class');

    const {
      name,
      email,
      password,
      teachSubject,
      schoolClass,
      phone,
      teacherId,
      subjects = [],
      classes = [],
    } = req.body;

    const user = await User.create({ name, email, password, role: 'teacher' });
    const teacher = await TeacherModel.create({
      user: user._id,
      teacherId,
      phone,
      subjects: teachSubject ? [teachSubject, ...subjects].filter(Boolean) : subjects.filter(Boolean),
      classes: schoolClass ? [schoolClass, ...classes].filter(Boolean) : classes.filter(Boolean),
    });

    if (teachSubject) {
      await Subject.findByIdAndUpdate(teachSubject, { teacher: teacher._id });
    }
    if (schoolClass) {
      await Class.findByIdAndUpdate(schoolClass, { classTeacher: teacher._id });
    }

    const populated = await TeacherModel.findById(teacher._id).populate('user subjects classes');
    success(res, formatTeacher(populated.toObject()), 201);
  } catch(e){ fail(res,e.message,500); }
};

exports.update  = async (req, res) => {
  try {
    const TeacherModel = require('../models/Teacher');
    const Subject = require('../models/Subject');
    const Class = require('../models/Class');
    const teacher = await TeacherModel.findByIdAndUpdate(req.params.id, req.body, { new:true });
    if (req.body.teachSubject) {
      await Subject.findByIdAndUpdate(req.body.teachSubject, { teacher: teacher._id });
    }
    if (req.body.schoolClass) {
      await Class.findByIdAndUpdate(req.body.schoolClass, { classTeacher: teacher._id });
    }
    const populated = await TeacherModel.findById(teacher._id).populate('user subjects classes');
    success(res, populated ? formatTeacher(populated.toObject()) : null);
  } catch(e){ fail(res,e.message,500); }
};

exports.remove  = async (req, res) => {
  try {
    const TeacherModel = require('../models/Teacher');
    const User = require('../models/User');
    const teacher = await TeacherModel.findByIdAndDelete(req.params.id);
    if (teacher?.user) {
      await User.findByIdAndDelete(teacher.user);
    }
    success(res, { message:'Deleted' });
  } catch(e){ fail(res,e.message,500); }
};
