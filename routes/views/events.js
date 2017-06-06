var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'events';

	// Load the posts
	view.on('init', function (next) {

		var now = new Date();
		keystone.list('OrgEvent').model.find({datetime: {$gt: now}}).sort('datetime').exec(function (err, results) {

			if (err || !results.length) {
				console.log(err);
				locals.events = [];
				return next(err);
			}

			locals.events = results;

			function formatDT(dt) {
				return
					dt.getMonth().toFixed(2) + '/' +
					dt.getDate().toFixed(2) + '/' +
					dt.getYear() + ' ' +
					(dt.getHours() % 12) + ':' +
					dt..getMinutes().toFixed(2) +
					(dt.getHours() >= 12 ? 'pm' : am);
			}

			locals.events.map(ev => ev.dt = formatDT(ev));

			async.each(locals.events, function (ev, n) {
				console.log(ev);
				keystone.list('Organization').model.findById(ev.organization).exec(function (err, org) {
					ev.org = org;
					n(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Render the view
	view.render('events');
};
