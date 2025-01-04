const router = require('express').Router();
const controller = require('../controller/blogController');
const { verifyRoute } = require('../middleware/authMiddleware');

router.get('/blogs/create', verifyRoute, controller.get_create);
router.get('/blogs', verifyRoute, controller.get_allBlogs);
router.get('/about', verifyRoute, controller.get_about);
router.post('/blogs', verifyRoute, controller.post_create);
router.get('/blogs/:id', verifyRoute, controller.get_details);
router.delete('/blogs/:id', verifyRoute, controller.delete_blog);

module.exports = router;