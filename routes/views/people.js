var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.orgType = 'People';

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'people';

	// Load the posts
	view.on('init', function (next) {

		keystone.list('User').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			results = results.filter(u => !u.isAdmin);

			locals.organizations = results;

			next();
		});
	});

	// Render the view
	view.render('people');
};
