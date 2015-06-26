var parseSettings = require('../config/parse'); 
var Backbone = require('backparse')(parseSettings);
var UserModel = require('../models/UserModel');

module.exports = Backbone.Collection.extend({
	model: UserModel, 
	parseClassName: '_User'
});
