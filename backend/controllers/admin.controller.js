const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const { success, fail } = require('../utils/responseHelper');

const formatClass = (cls) => ({
  _id: cls._id,
  className: cls.name,
  numericID: cls.numericID || '',
  students: cls.students || [],
  subjects: cls.subjects || [],
  teacher: cls.classTeacher || null,
  classTeacher: cls.classTeacher || null,
});

const formatSubject = (subject) => ({
  _id: subject._id,
  subName: subject.name,
  subCode: subject.code || '',
  sessions: subject.sessions || 0,
  teacher: subject.teacher?.user
    ? { _id: subject.teacher._id, name: subject.teacher.user.name }
    : subject.teacher || null,
  sclassName: subject.sclassName
    ? {
        _id: subject.sclassName._id,
        className: subject.sclassName.name,
        numericID: subject.sclassName.numericID || '',
      }
    : null,
});

const formatStudent = (student) => ({
  _id: student._id,
  name: student.user?.name || '',
  email: student.user?.email || '',
  rollNum: student.studentId || '',
  studentId: student.studentId || '',
  schoolClass: student.class
    ? {
        _id: student.class._id,
        className: student.class.name,
        numericID: student.class.numericID || '',
      }
    : null,
  class: student.class || null,
  user: student.user || null,
});

const formatTeacher = (teacher) => ({
  _id: teacher._id,
  name: teacher.user?.name || '',
  email: teacher.user?.email || '',
  teacherId: teacher.teacherId || '',
  phone: teacher.phone || '',
  teachSubject: teacher.subjects?.[0]
    ? {
        _id: teacher.subjects[0]._id,
        subName: teacher.subjects[0].name,
        subCode: teacher.subjects[0].code || '',
      }
    : null,
  schoolClass: teacher.classes?.[0]
    ? {
        _id: teacher.classes[0]._id,
        className: teacher.classes[0].name,
        numericID: teacher.classes[0].numericID || '',
      }
    : null,
  subjects: teacher.subjects || [],
  classes: teacher.classes || [],
  user: teacher.user || null,
});

exports.getStats = async (req, res) => {
  try {
    const [students, teachers, classes, subjects, users] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Class.countDocuments(),
      Subject.countDocuments(),
      User.countDocuments(),
    ]);
    success(res, { students, teachers, classes, subjects, users });
  } catch (e) { fail(res, e.message, 500); }
};

exports.getAllUsers = async (req, res) => {
  try { success(res, await User.find().select('-password')); }
  catch (e) { fail(res, e.message, 500); }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    success(res, { message: 'Deleted' });
  } catch (e) { fail(res, e.message, 500); }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user class');
    success(res, students.map((student) => formatStudent(student.toObject())));
  } catch (e) { fail(res, e.message, 500); }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, rollNum, sclassName } = req.body;
    const user = await User.create({ name, email, password, role: 'student' });
    const student = await Student.create({
      user: user._id,
      studentId: rollNum,
      class: sclassName || null,
    });

    if (sclassName) {
      await Class.findByIdAndUpdate(sclassName, { $addToSet: { students: student._id } });
    }

    const populated = await Student.findById(student._id).populate('user class');
    success(res, formatStudent(populated.toObject()), 201);
  } catch (e) { fail(res, e.message, 500); }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (student?.class) {
      await Class.findByIdAndUpdate(student.class, { $pull: { students: student._id } });
    }
    if (student?.user) {
      await User.findByIdAndDelete(student.user);
    }
    success(res, { message: 'Deleted' });
  } catch (e) { fail(res, e.message, 500); }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('user subjects classes');
    success(res, teachers.map((teacher) => formatTeacher(teacher.toObject())));
  } catch (e) { fail(res, e.message, 500); }
};

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password, teachSubject, schoolClass, phone, teacherId } = req.body;
    const user = await User.create({ name, email, password, role: 'teacher' });
    const teacher = await Teacher.create({
      user: user._id,
      teacherId,
      phone,
      subjects: teachSubject ? [teachSubject] : [],
      classes: schoolClass ? [schoolClass] : [],
    });

    if (teachSubject) {
      const subject = await Subject.findById(teachSubject);
      if (subject?.teacher && subject.teacher.toString() !== teacher._id.toString()) {
        await Teacher.findByIdAndUpdate(subject.teacher, { $pull: { subjects: teachSubject } });
      }
      await Subject.findByIdAndUpdate(teachSubject, { teacher: teacher._id });
    }
    if (schoolClass) {
      const classDoc = await Class.findById(schoolClass);
      if (classDoc?.classTeacher && classDoc.classTeacher.toString() !== teacher._id.toString()) {
        await Teacher.findByIdAndUpdate(classDoc.classTeacher, { $pull: { classes: schoolClass } });
      }
      await Class.findByIdAndUpdate(schoolClass, { classTeacher: teacher._id });
    }

    const populated = await Teacher.findById(teacher._id).populate('user subjects classes');
    success(res, formatTeacher(populated.toObject()), 201);
  } catch (e) { fail(res, e.message, 500); }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('subjects classes');
    if (!teacher) {
      return fail(res, 'Teacher not found', 404);
    }

    const { teachSubject, schoolClass, phone, teacherId } = req.body;
    const previousSubjectId = teacher.subjects?.[0]?._id?.toString() || teacher.subjects?.[0]?.toString() || null;
    const previousClassId = teacher.classes?.[0]?._id?.toString() || teacher.classes?.[0]?.toString() || null;
    const nextSubjectId = teachSubject || null;
    const nextClassId = schoolClass || null;

    if (previousSubjectId && previousSubjectId !== nextSubjectId) {
      await Subject.findByIdAndUpdate(previousSubjectId, { $unset: { teacher: '' } });
    }
    if (previousClassId && previousClassId !== nextClassId) {
      await Class.findByIdAndUpdate(previousClassId, { $unset: { classTeacher: '' } });
    }

    teacher.teacherId = teacherId ?? teacher.teacherId;
    teacher.phone = phone ?? teacher.phone;
    teacher.subjects = nextSubjectId ? [nextSubjectId] : [];
    teacher.classes = nextClassId ? [nextClassId] : [];
    await teacher.save();

    if (nextSubjectId) {
      const subject = await Subject.findById(nextSubjectId);
      if (subject?.teacher && subject.teacher.toString() !== teacher._id.toString()) {
        await Teacher.findByIdAndUpdate(subject.teacher, { $pull: { subjects: nextSubjectId } });
      }
      await Subject.findByIdAndUpdate(nextSubjectId, { teacher: teacher._id });
    }

    if (nextClassId) {
      const schoolClassDoc = await Class.findById(nextClassId);
      if (schoolClassDoc?.classTeacher && schoolClassDoc.classTeacher.toString() !== teacher._id.toString()) {
        await Teacher.findByIdAndUpdate(schoolClassDoc.classTeacher, { $pull: { classes: nextClassId } });
      }
      await Class.findByIdAndUpdate(nextClassId, { classTeacher: teacher._id });
    }

    const populated = await Teacher.findById(teacher._id).populate('user subjects classes');
    success(res, formatTeacher(populated.toObject()));
  } catch (e) { fail(res, e.message, 500); }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    await Subject.updateMany({ teacher: req.params.id }, { $unset: { teacher: '' } });
    await Class.updateMany({ classTeacher: req.params.id }, { $unset: { classTeacher: '' } });
    if (teacher) {
      await Subject.updateMany({ teacher: teacher._id }, { $unset: { teacher: '' } });
      await Class.updateMany({ classTeacher: teacher._id }, { $unset: { classTeacher: '' } });
    }
    if (teacher?.user) {
      await User.findByIdAndDelete(teacher.user);
    }
    success(res, { message: 'Deleted' });
  } catch (e) { fail(res, e.message, 500); }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('classTeacher subjects students');
    success(res, classes.map((cls) => formatClass(cls.toObject())));
  } catch (e) { fail(res, e.message, 500); }
};

exports.createClass = async (req, res) => {
  try {
    const { className, numericID } = req.body;
    const created = await Class.create({ name: className, numericID });
    const populated = await Class.findById(created._id).populate('classTeacher subjects students');
    success(res, formatClass(populated.toObject()), 201);
  } catch (e) { fail(res, e.message, 500); }
};

exports.deleteClass = async (req, res) => {
  try {
    await Student.updateMany({ class: req.params.id }, { $unset: { class: '' } });
    await Teacher.updateMany({ classes: req.params.id }, { $pull: { classes: req.params.id } });
    await Subject.updateMany({ sclassName: req.params.id }, { $unset: { sclassName: '' } });
    await Class.findByIdAndDelete(req.params.id);
    success(res, { message: 'Deleted' });
  } catch (e) { fail(res, e.message, 500); }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate({ path: 'teacher', populate: { path: 'user' } }).populate('sclassName');
    success(res, subjects.map((subject) => formatSubject(subject.toObject())));
  } catch (e) { fail(res, e.message, 500); }
};

exports.createSubject = async (req, res) => {
  try {
    const { subName, subCode, sessions, sclassName, teacher } = req.body;
    const created = await Subject.create({
      name: subName,
      code: subCode,
      sessions: Number(sessions || 0),
      sclassName,
      teacher: teacher || null,
    });
    if (sclassName) {
      await Class.findByIdAndUpdate(sclassName, { $addToSet: { subjects: created._id } });
    }
    if (teacher) {
      await Teacher.findByIdAndUpdate(teacher, { $addToSet: { subjects: created._id } });
    }
    const populated = await Subject.findById(created._id).populate({ path: 'teacher', populate: { path: 'user' } }).populate('sclassName');
    success(res, formatSubject(populated.toObject()), 201);
  } catch (e) { fail(res, e.message, 500); }
};

exports.deleteSubject = async (req, res) => {
  try {
    await Teacher.updateMany({ subjects: req.params.id }, { $pull: { subjects: req.params.id } });
    await Class.updateMany({ subjects: req.params.id }, { $pull: { subjects: req.params.id } });
    await Subject.findByIdAndDelete(req.params.id);
    success(res, { message: 'Deleted' });
  } catch (e) { fail(res, e.message, 500); }
};
