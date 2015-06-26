var React = require('react');
var Backbone = require('backparse')(require('./config/parse'));
var Navigation = require('./components/Navigation');
var UserModel = require('./models/UserModel');
var PostCollection = require('./collections/PostCollection'); 

var PostListPage = require('./components/PostListPage'); 
var RegisterPage = require('./components/RegisterPage'); 
var LoginPage = require('./components/LoginPage');
var AdminPage = require('./components/AdminPage');
var PostPage = require('./components/PostPage'); 

var containerEl = document.getElementById('container');
var navigationEl = document.getElementById('navigation'); 
var user = new UserModel(); 
var posts = new PostCollection(); 
var postList = (<PostListPage posts={posts} />); 

React.render(<Navigation user={user} />, navigationEl);

function fetchPosts(category, query) {
	var q = {};
	if(category) {
		q.category = category;
	}

	posts.fetch({
		query: q, 
		success: function() {
			React.render(postList, containerEl);
		}
	});
}

var App = Backbone.Router.extend({
	routes: {
		'': 'home', 
		'post/:postId': 'post', 
		'category/:category': 'category', 
		'search/:query': 'search', 
		'login': 'login', 
		'register': 'register', 
		'admin': 'admin'
	}, 

	home: function() {
		fetchPosts(); 
		React.render(postList, containerEl);
	}, 
	category: function(category) {
		fetchPosts(category); 
		React.render(postList, containerEl);
	},
	search: function(query) {
		fetchPosts(null, query); 
		React.render(postList, containerEl);
	}, 
	post: function(postId) {
		React.render(<PostPage postId={postId} />, containerEl);
	}, 
	login: function() {
		React.render(<LoginPage router={this} user={user} />, containerEl);
	}, 
	register: function() {
		React.render(<RegisterPage router={this} user={user} />, containerEl);
	}, 
	admin: function() {
		React.render(<AdminPage router={this} />, containerEl);
	}
});

var app = new App();
Backbone.history.start();

// user.me();



