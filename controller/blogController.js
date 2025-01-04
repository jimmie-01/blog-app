const Blog = require('../model/blogs');

module.exports.get_allBlogs = (req, res) => {
	Blog.find().sort({ createdAt: -1 })
		.then(result => {
			res.render('blogs', { blogs: result, title: 'All Blogs' });
		}).catch(err => {
			console.log(err);
		});
};

module.exports.get_create = (req, res) => {
	res.render('create', { title: 'Create A New Blog' });
};

module.exports.get_about = (req, res) => {
	res.render('about', { title: 'About Page' });
};

module.exports.post_create = (req, res) => {
	const blog = new Blog(req.body);

	blog.save()
		.then(result => {
			res.redirect('/blogs');
		}).catch(err => {
			console.log(err);
		});
};