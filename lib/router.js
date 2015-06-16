Router.configure({
	layoutTemplate: 'layout'
})

Router.route('/', {
	template: 'Home',
	waitOn: function() {
		return Meteor.subscribe('nearPlaces', Session.get('bottomLeft'), Session.get('topRight'))
	},

	data: function() { return Places.find()}
})