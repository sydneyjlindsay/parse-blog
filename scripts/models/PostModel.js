var Backbone = require('backparse')(require('../config/parse')); 

module.exports = Backbone.Model.extend({
	defaults: {
		title: '', 
		body: '', 
		category: ''
	}, 
	parseClassName: 'post', 
	idAttribute: 'objectId', 
	validate: function(attrs) {
		if(!attrs.title) {
			return 'A title is required';
		}
		if(!attrs.body) {
			return 'A body is required';
		}
		if(!attrs.category) {
			return 'A category is required';
		}
	}
});