Places = new Mongo.Collection('places');

Meteor.methods({
	'fetchLocations': function(coords) {
		if(Meteor.isServer) {
			request = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coords.latitude + "," + coords.longitude + "&radius=500&types=food&key=AIzaSyBiLd3_x2LqiMWEoIJEg3q6MK_uGgf7EdY");
			console.log(request);
			_(request.data.results).each(function(place) {
				_.extend(place, {loc: {type: "Point", coordinates: [place.geometry.location.lng, place.geometry.location.lat]}});
				Places.upsert({googleId: place.id}, {$set: place});
			});
		}
	}
});