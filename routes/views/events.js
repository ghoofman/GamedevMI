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

			locals.events.map(ev => ev.dt =
				('0' + (ev.datetime.getMonth() + 1)).slice(-2) + '/' +
				('0' + ev.datetime.getDate()).slice(-2) + '/' +
				ev.datetime.getFullYear() + ', ' +
				(ev.datetime.getHours() % 12) + ':' +
				('0' + ev.datetime.getMinutes()).slice(-2) + '' +
				(ev.datetime.getHours() >= 12 ? 'PM' : 'AM') + ' EST');

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
