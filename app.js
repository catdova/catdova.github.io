$(document).ready(function(){

var trails = []

	//Get user location
	if (navigator.geolocation) {
	  	navigator.geolocation.getCurrentPosition(function(position) {
		    var lat = position.coords.latitude;
		    var long = position.coords.longitude;
		    var loc = "lat=" + lat + "&lon=" + long;
		    console.log(loc)
		    console.log('lat: ', lat);
		    console.log('long: ', long);


		//Hiking Project Trails API Call
		$.ajax({
			url: "https://www.hikingproject.com/data/get-trails?" + loc + "&maxDistance=10&key=200182493-cdf8aa13009111efd12b83fe01eef23d",
		 	dataType: "json",
		  	success: function(data){
		  		for (i = 0; i < data.trails.length; i++) {

			  		//trail info
			  		var name = data.trails[i].name;
			  		var link = data.trails[i].url;
			  		var summary = data.trails[i].summary;
			  		var stars = data.trails[i].stars;

			  		trails[i]={
			  			name: data.trails[i].name, 
			  			summary: data.trails[i].summary, 
			  			stars: data.trails[i].stars,
			  			img: data.trails[i].imgSmall,
			  			trailLength: data.trails[i].length,
			  			difficulty: data.trails[i].difficulty,
			  			longitude: data.trails[i].longitude,
			  			latitude: data.trails[i].latitude,
			  		};


		   			var nameList = "<li class='drop-down' id='trail-"+i+"'>" + name + "<div class='toggle'><p>"+ summary+ "</p><p>Score: "+stars +" stars</p></div></li>"
		    		$('#trail-list').append(nameList);
		    		}


		    	console.log(trails)


	    		$('.drop-down').click(function(){

	    			var selectedTrail = trails[this.id.split("-")[1]];
	    			console.log(selectedTrail.name);

	    			//Weather AJAX Call
		    		var weatherGeolocation = selectedTrail.latitude + "," + selectedTrail.longitude;
		    		$.ajax({
		    			url:"http://api.wunderground.com/api/5964f878d62c41e9/geolookup//forecast/q/" + weatherGeolocation + ".json",
		    			dataType: "json",
		    			success: function(results){
		    				console.log(results.location.city)
		    				console.log(results.forecast.simpleforecast.forecastday[0].conditions);
		    				var weatherInfo = "<p class='trail-detail'> Current Weather Conditions:</p><p class='weather-detail' ><a href="+ results.location.wuiurl +">"+ results.forecast.simpleforecast.forecastday[0].conditions + ", High of " +results.forecast.simpleforecast.forecastday[0].high.fahrenheit  +"</p>"
		    				$('#trail-results').append(weatherInfo);
		    			}
		    		});

	    			

	    			var trailInfo = "<p class='trail-title'>"+ selectedTrail.name + "</p>";
	    			trailInfo += "<img src='" + selectedTrail.img + "'>"
	    			trailInfo += "<p class='trail-detail'>" + selectedTrail.summary +"</p>";
	    			trailInfo += "<p class='trail-detail'> Length: " + selectedTrail.trailLength + "</p>";
	    			trailInfo += "<p class='trail-detail'> Difficulty: " + selectedTrail.difficulty + "</p>";
	    			if ('#trail-results' == ''){
	    				$('#trail-results').append(trailInfo);
	    			}
	    			else {
	    				$('#trail-results').html('');
	    				$('#trail-results').append(trailInfo);
	    			}
	    			

					$(this.children).slideToggle();
					// $(this.children).append()
				});
	  		}
		});
		});

	} 

});

