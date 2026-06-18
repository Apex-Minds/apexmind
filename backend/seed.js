const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = "mongodb+srv://apex_products:apex2199ikuran@apexcluster.zeglg9l.mongodb.net/apex_products?retryWrites=true&w=majority";

// ── Schemas (inline so no import path issues) ──────────────────────────────

const UserSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true },
  password: String, role: String,
}, { timestamps: true });

const SubjectSchema = new mongoose.Schema({
  name: String, code: { type: String, unique: true }, teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });

const TeacherSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacherId: { type: String, unique: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  phone: String,
}, { timestamps: true });

const ClassSchema = new mongoose.Schema({
  name: String, section: String,
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentId: { type: String, unique: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  guardianName: String,
  guardianPhone: String,
}, { timestamps: true });

const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  date: Date, status: String, markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });

const MarkSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  examType: String, score: Number, totalMarks: Number,
  term: String, enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Subject = mongoose.model('Subject', SubjectSchema);
const Teacher = mongoose.model('Teacher', TeacherSchema);
const Class = mongoose.model('Class', ClassSchema);
const Student = mongoose.model('Student', StudentSchema);
const Attendance = mongoose.model('Attendance', AttendanceSchema);
const Mark = mongoose.model('Mark', MarkSchema);

// ── Seed ───────────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([User, Subject, Teacher, Class, Student, Attendance, Mark]
    .map(M => M.deleteMany({})));
  console.log('Cleared existing data');

  const hash = (pw) => bcrypt.hashSync(pw, 10);

  // ── Users ──
  const adminUser = await User.create({
    name: 'Admin User', email: 'admin@apexminds.com',
    password: hash('admin123'), role: 'admin',
  });

  const teacherUser1 = await User.create({
    name: 'Mr. Kwame Asante', email: 'kwame@apexminds.com',
    password: hash('teacher123'), role: 'teacher',
  });
  const teacherUser2 = await User.create({
    name: 'Ms. Abena Mensah', email: 'abena@apexminds.com',
    password: hash('teacher123'), role: 'teacher',
  });

  const studentUser1 = await User.create({
    name: 'Kofi Boateng', email: 'kofi@apexminds.com',
    password: hash('student123'), role: 'student',
  });
  const studentUser2 = await User.create({
    name: 'Ama Owusu', email: 'ama@apexminds.com',
    password: hash('student123'), role: 'student',
  });
  const studentUser3 = await User.create({
    name: 'Yaw Darko', email: 'yaw@apexminds.com',
    password: hash('student123'), role: 'student',
  });

  // ── Subjects ──
  const maths = await Subject.create({ name: 'Mathematics', code: 'MATH101' });
  const english = await Subject.create({ name: 'English Language', code: 'ENG101' });
  const science = await Subject.create({ name: 'Integrated Science', code: 'SCI101' });
  const ict = await Subject.create({ name: 'ICT', code: 'ICT101' });

  // ── Teachers ──
  const teacher1 = await Teacher.create({
    user: teacherUser1._id, teacherId: 'TCH001',
    subjects: [maths._id, science._id], phone: '0244000001',
  });
  const teacher2 = await Teacher.create({
    user: teacherUser2._id, teacherId: 'TCH002',
    subjects: [english._id, ict._id], phone: '0244000002',
  });

  // Link subjects to teachers
  await Subject.findByIdAndUpdate(maths._id, { teacher: teacher1._id });
  await Subject.findByIdAndUpdate(science._id, { teacher: teacher1._id });
  await Subject.findByIdAndUpdate(english._id, { teacher: teacher2._id });
  await Subject.findByIdAndUpdate(ict._id, { teacher: teacher2._id });

  // ── Students ──
  const student1 = await Student.create({ user: studentUser1._id, studentId: 'STU001', guardianName: 'Mr. Boateng Sr.' });
  const student2 = await Student.create({ user: studentUser2._id, studentId: 'STU002', guardianName: 'Mrs. Owusu' });
  const student3 = await Student.create({ user: studentUser3._id, studentId: 'STU003', guardianName: 'Mr. Darko Sr.' });

  // ── Classes ──
  const classA = await Class.create({
    name: 'Form 1', section: 'A',
    classTeacher: teacher1._id,
    subjects: [maths._id, english._id, science._id, ict._id],
    students: [student1._id, student2._id, student3._id],
  });

  // Link class back to students and teacher
  await Student.updateMany({ _id: { $in: [student1._id, student2._id, student3._id] } }, { class: classA._id });
  await Teacher.findByIdAndUpdate(teacher1._id, { $push: { classes: classA._id } });

  // ── Attendance ──
  const today = new Date();
  const days = [-4, -3, -2, -1, 0];
  for (const d of days) {
    const date = new Date(today); date.setDate(today.getDate() + d);
    await Attendance.create({ student: student1._id, class: classA._id, date, status: 'present', markedBy: teacher1._id });
    await Attendance.create({ student: student2._id, class: classA._id, date, status: d === -2 ? 'absent' : 'present', markedBy: teacher1._id });
    await Attendance.create({ student: student3._id, class: classA._id, date, status: d === -1 ? 'late' : 'present', markedBy: teacher1._id });
  }

  // ── Marks ──
  const examData = [
    { subject: maths._id, examType: 'midterm', scores: [78, 85, 62] },
    { subject: english._id, examType: 'midterm', scores: [88, 72, 90] },
    { subject: science._id, examType: 'quiz', scores: [65, 80, 70] },
    { subject: ict._id, examType: 'assignment', scores: [92, 88, 75] },
  ];
  const students = [student1, student2, student3];
  for (const exam of examData) {
    for (let i = 0; i < students.length; i++) {
      await Mark.create({
        student: students[i]._id, subject: exam.subject,
        class: classA._id, examType: exam.examType,
        score: exam.scores[i], totalMarks: 100,
        term: 'Term 1', enteredBy: teacher1._id,
      });
    }
  }

  console.log('\n✅ Seed complete!\n');
  console.log('─────────────────────────────────────');
  console.log('  ADMIN');
  console.log('  Email:    admin@apexminds.com');
  console.log('  Password: admin123');
  console.log('─────────────────────────────────────');
  console.log('  TEACHER 1');
  console.log('  Email:    kwame@apexminds.com');
  console.log('  Password: teacher123');
  console.log('─────────────────────────────────────');
  console.log('  TEACHER 2');
  console.log('  Email:    abena@apexminds.com');
  console.log('  Password: teacher123');
  console.log('─────────────────────────────────────');
  console.log('  STUDENT 1');
  console.log('  Email:    kofi@apexminds.com');
  console.log('  Password: student123');
  console.log('─────────────────────────────────────');
  console.log('  STUDENT 2');
  console.log('  Email:    ama@apexminds.com');
  console.log('  Password: student123');
  console.log('─────────────────────────────────────');
  console.log('  STUDENT 3');
  console.log('  Email:    yaw@apexminds.com');
  console.log('  Password: student123');
  console.log('─────────────────────────────────────\n');

  await mongoose.disconnect();
}

seed().catch(err => { console.error('Seed failed:', err); process.exit(1); });