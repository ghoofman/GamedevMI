var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var OrgEvent = new keystone.List('OrgEvent', {
	autokey: { from: 'name', path: 'key', unique: true },
});

OrgEvent.add({
	name: { type: String, required: true },
	url: { type: String },
	location: { type: String },
	datetime: { type: Date },
	organization: { type: Types.Relationship, ref: 'Organization', many: false },
});

OrgEvent.relationship({ ref: 'Organization', path: 'org', refPath: 'organization' });

OrgEvent.register();
