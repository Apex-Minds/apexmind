const router = require('express').Router();
const c = require('../controllers/attendance.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
router.use(protect);
router.post('/',                  authorize('teacher','admin'), c.mark);
router.get('/class/:classId',     authorize('teacher','admin'), c.getByClass);
router.get('/student/:studentId', c.getByStudent);
module.exports = router;
