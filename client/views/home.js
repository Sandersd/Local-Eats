Template.home.rendered = function() {
	Tracker.autorun(function() {
		if(Session.get('location')) {
			latitude = Session.get('location').coords.latitude;
			longitude = Session.get('location').coords.longitude;
			var map = L.map('map').setView([latitude,longitude], 16); 
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: '$copy; <a href="http://osm.org/copyright">OpenStreettMap</a> contributors'
			}).addTo(map);
			L.marker([latitude, longitude]).addTo(map).bindPopup('You\'re Here').openPopup();
			bounds = map.getBounds();
			if(bounds) {
				Session.set('bottomLeft', [bounds._southWest.lng, bounds._southWest.lat]);
				Session.set('topRight', [bounds._northEast.lng, bounds._northEast.lat]);
			}
		}
	});
}