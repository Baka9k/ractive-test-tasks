var button = new Ractive({
	el: 'container',
	template: '<button type="button" class="btn btn-primary" on-click="count">You clicked me {{timesClicked}} times</button>',
	data: {
		timesClicked: 0
	}
});

button.on( 'count', function (event) {
	// `this` is the ractive
	// `event` contains information about the proxy event
	console.log("Button clicked");
	console.log("Button state: ", this);
	this.set("timesClicked", this.get("timesClicked") + 1);
});
