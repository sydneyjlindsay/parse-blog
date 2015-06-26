var Backbone = require('backparse')(require('../config/parse'));

module.exports = Backbone.Model.extend({
	defaults: {
		username: '',
		password: '',
		email: ''
	},
	parseClassName: '_User',
	isUser: true,
	idAttribute: 'objectId',
	save: function(key, val, options) {
		this.unset('confirmPassword');
		return Backbone.Model.prototype.save.call(this, key, val, options);
	}
});