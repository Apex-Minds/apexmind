const router = require('express').Router();
const c = require('../controllers/public.controller');

router.get('/news-events', c.getNewsEvents);
router.get('/news-events/:slug', c.getNewsEventBySlug);
router.post('/contact', c.submitContact);

module.exports = router;
