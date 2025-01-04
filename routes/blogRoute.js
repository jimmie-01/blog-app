const router = require('express').Router();
const controller = require('../controller/blogController');
const { verifyRoute } = require('../middleware/authMiddleware');

router.get('/blogs', verifyRoute, controller.get_allBlogs);
router.get('/blogs/create', verifyRoute, controller.get_create);
router.get('/about', verifyRoute, controller.get_about);
router.post('/blogs', verifyRoute, controller.post_create);
router.get('/blog/:id');
router.delete('/blog/:id')

module.exports = router;