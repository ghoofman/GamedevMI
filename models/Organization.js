var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var Organization = new keystone.List('Organization', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Organization.add({
	name: { type: String, required: true },
	orgType: { type: String },
	icon: { type: String },
	location: { type: String },
	url: { type: String },
	channelType: { type: String },
	channelLink: { type: String },
	contactName: { type: String },
	contactEmail: { type: String }
});

Organization.register();
