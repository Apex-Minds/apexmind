const router = require('express').Router();
const c = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
router.use(protect, authorize('admin'));
router.get('/stats',        c.getStats);
router.get('/users',        c.getAllUsers);
router.delete('/users/:id', c.deleteUser);

router.get('/students',     c.getStudents);
router.post('/students',    c.createStudent);
router.delete('/students/:id', c.deleteStudent);

router.get('/teachers',     c.getTeachers);
router.post('/teachers',    c.createTeacher);
router.delete('/teachers/:id', c.deleteTeacher);

router.get('/classes',      c.getClasses);
router.post('/classes',     c.createClass);
router.delete('/classes/:id', c.deleteClass);

router.get('/subjects',     c.getSubjects);
router.post('/subjects',    c.createSubject);
router.delete('/subjects/:id', c.deleteSubject);

const wc = require('../controllers/website.controller');
router.get('/news-events',       wc.getAllNewsEvents);
router.post('/news-events',      wc.createNewsEvent);
router.put('/news-events/:id',   wc.updateNewsEvent);
router.delete('/news-events/:id', wc.deleteNewsEvent);
router.get('/contact-inquiries', wc.getContactInquiries);

module.exports = router;
