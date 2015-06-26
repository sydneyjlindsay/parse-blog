var React = require('react'); 
var UserCollection = require('../collections/UserCollection');
var PostModel = require('../models/PostModel');

module.exports = React.createClass({
	componentWillMount: function() {

	},
	getInitialState: function() {
		return {
			errors: {}
		};
	}, 
	render: function() {
		var genericError = null; 
		if(this.state.errors.generic) {
			genericError = (<div className="alert alert-danger">{this.state.errors.generic}</div>);
		}
		return (
			<div className="row">
				<div className="col-sm-6 col-sm-offset-3">
					<h1>New Post</h1>
					{genericError}

					<form onSubmit={this.onAddPost}>
						<div className="form-group">
							<label>Title</label>
							<input type="text" className="form-control" placeholder="Email" ref="title" />
							<p className="help-block">{this.state.errors.title}</p>
						</div>

						<div className="form-group">
							<label>Body</label>
							<textarea className="form-control" ref="body"></textarea>
							<p className="help-block">{this.state.errors.body}</p>
						</div>

						<div className="form-group">
							<label>Category</label>
							<select className="form-control" ref="Category">
								<option value="">--Choose a Category --</option>
								<option value="">Animals</option>
								<option value="">Plants</option>
								<option value="">Food</option>
								<option value="">Desserts</option>
								<option value="">Apple Products</option>
							</select>
							<p className="help-block">{this.state.errors.category}</p>
						</div>
						<button type="submit" className="btn btn-default">Submit</button>
					</form>
				</div>
			</div>
		);
	},
	onAddPost: function(e) {
		e.preventDefault();
		var self = this; 
		var post = new PostModel({
			title: this.refs.title.getDOMNode().value, 
			body: this.refs.body.getDOMNode().value, 
			category: this.refs.category.getDOMNode().value
		});

		if(post.isValid()) {
			post.save(null, {
				success: function() {
					self.props.router.navigate('/post/'+post.id, {trigger:true});
				}
			});
		}
		else {
			this.setState({errors: {generic: post.validationError}});
		}
	}
});