var React = require('react'); 
var PostModel = require('../models/PostModel');

module.exports = React.createClass({
	getInitialState: function() {
		var self = this; 
		var post = new PostModel({
			objectId: this.props.postId
		});
		post.fetch(); 
		post.on('change', function() {
			self.forceUpdate();
		});

		return {
			post: post
		};
	}, 
	render: function() {
		return (
			<div className="row">
				<div className="col-sm-6 col-sm-offset-3">
					<h1>{this.state.post.get('title')}</h1>
					<p>{this.state.post.get('body')}</p>
				</div>
			</div>
		);
	}
});