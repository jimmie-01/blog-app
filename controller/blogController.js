const Blog = require('../model/blogs');

module.exports.get_home_page = async(req, res) =>{
	Blog.find().sort({createdAt: -1})
		.then(result => {
			res.render('home', { title: 'Home Page', blogs: result });
		}).catch(error => {
			console.log(error);
		});
};

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

module.exports.get_details = (req, res) => {
	const id = req.params.id;

	Blog.findById(id)
		.then(result => {
			res.render('details', { blog: result, title: 'Blog Details'});
		}).catch(err => {
			console.log(err);
		});
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

module.exports.delete_blog = (req, res) => {
	const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then(result => {
			res.json({ redirect: '/blogs' });
		}).catch(err => {
			console.log(err);
		});
};