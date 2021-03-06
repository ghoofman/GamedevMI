var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.orgType = 'Schools';

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'schools';

	// Load the posts
	view.on('init', function (next) {

		keystone.list('Organization').model.find().where('orgType', 'school').sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.organizations = results;

			next();
		});
	});

	// Render the view
	view.render('organizations');
};
