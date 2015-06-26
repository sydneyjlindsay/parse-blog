var React = require('react'); 
var validator = require('validator'); 

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors: {}
		};
	},
	render: function() {
		var genericError = null; 
		if(this.state.errors.generic) {
			genericError = (<div className="alert alert-danger" role="alert">{this.state.errors.generic}</div>);
		}
		return (
			<div className="row">
				<div className="col-sm-6 col-sm-offset-3">
					<h1>Log In</h1>
					{genericError}
					<form onSubmit={this.onLogin}>
						<div className={'form-group' + (this.state.errors.email ? ' has-error' : '')}>
							<label>Email address</label>
							<input type="text" className="form-control" placeholder="Email" ref="email" />
							<p className="help-block">{this.state.errors.email}</p>
						</div>

						<div className={'form-group' + (this.state.errors.password ? ' has-error' : '')}>
							<label>Password</label>
							<input type="password" className="form-control" placeholder="Password" ref="password" />
							<p className="help-block">{this.state.errors.password}</p>
						</div>

						<button type="submit" className="btn btn-default">Submit</button>
					</form>
				</div>
			</div>
		);
	}, 
	hasError: function(errors) {
		for(var i in errors) {
			if(errors[i]) {
				return true;
			}
		}
		return false;
	}, 
	onLogin: function(e) {
		e.preventDefault();
		var self = this;
		var login = {
			username: this.refs.email.getDOMNode().value,
			password: this.refs.password.getDOMNode().value
		};

		var errors = this.getInitialState().errors;

		if(!login.username) {
			errors.email = 'Please enter an email address.';
		}
		else if(!validator.isEmail(login.username)) {
			errors.email = 'This looks like an invalid email address.';
		}

		if(!login.password) {
			errors.password = 'Please enter a password.';
		}

		this.setState({errors: errors});

		if(!this.hasError(errors)) {
			this.props.user.login(login, {
				success: function(userModel) {
					self.props.router.navigate('/', {trigger: true});
				},
				error: function(userModel, response) {
					self.setState({errors: {generic: response.responseJSON.error}});
				}
			});
		}
	}
});