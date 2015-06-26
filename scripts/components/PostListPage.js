var React = require('react'); 
var PostCollection = require('../collections/PostCollection');

module.exports = React.createClass({
	render: function() {
		var postEls = this.props.posts.map(function(postModel) {
			return (
				<div key={postModel.cid}>
					<h3>{postModel.get('title')}</h3>
					<p>{postModel.get('body')}</p>
					<p><a href={'#category/'+postModel.get('category')}>{postModel.get('category')}</a></p>
				</div>
			);
		});
		return (
			<div className="row">
				<div className="col-sm-6 col-sm-offset-3">
					{postEls}
				</div>
			</div>
		);
	}
});