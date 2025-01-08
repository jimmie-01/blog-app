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

module.exports.get_update_blog = (req, res) => {
	const id = req.params.id;

	Blog.findById(id)
		.then(result => {
			res.render('edit', { title: "Edit Blog Post", blog: result });
		}).catch(error => {
			res.status(500).send('Error Fetching Blog Post');
		});
};

module.exports.update_blog = (req, res) => {
	const id = req.params.id;

	Blog.findByIdAndUpdate(id, {
		title: req.body.title,
		snippet: req.body.snippet,
		body: req.body.body
	})
		.then(result => {
			res.redirect(`/blogs/${id}`);
		}).catch(err => {
			res.status(500).send('Error Updating Blog Post');
		});
};