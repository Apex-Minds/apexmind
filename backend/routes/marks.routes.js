const router = require('express').Router();
const c = require('../controllers/marks.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
router.use(protect);
router.post('/',                  authorize('teacher','admin'), c.enter);
router.get('/student/:studentId', c.getByStudent);
router.get('/class/:classId',     authorize('teacher','admin'), c.getByClass);
module.exports = router;
