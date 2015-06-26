var Backbone = require('backparse')(require('../config/parse'));
var PostModel = require('../models/PostModel');

module.exports = Backbone.Collection.extend({
	model: PostModel,
	parseClassName: 'post'
});