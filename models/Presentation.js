var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var Presentation = new keystone.List('Presentation', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Presentation.add({
	name: { type: String, required: true },
	url: { type: String },
	video: { type: String },
	description: { type: Types.Html, wysiwyg: true, height: 400 },
	location: { type: String },
	datetime: { type: Date },
	organization: { type: Types.Relationship, ref: 'Organization', many: false },
});

Presentation.relationship({ ref: 'Organization', path: 'org', refPath: 'organization' });

Presentation.register();
