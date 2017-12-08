/*global $ APIKEY
navigator
APIKEYWEATHER*/
$(document).ready(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log(position.coords.latitude);
			console.log(position.coords.longitude);
			showWeather(position);
			// add function to get the weather
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}

	function showWeather(position) {
		var lat = position.coords.latitude;
		var long = position.coords.longitude;
		var icons = {
			//storing icons to display depening on icon of api
			clearSky: "<i class='wi wi-day-sunny'></i>",
			fewClouds: "<i class='wi wi-day-cloudy'></i>",
			scatteredClouds: "<i class='wi wi-cloudy'></i>",
			brokenClouds: "<i class='wi wi-cloud'></i>",
			showerRain: "<i class='wi wi-raindrops'></i>",
			rain: "<i class='wi wi-rain'></i>",
			thunderstorm: "<i class='wi wi-thunderstorm'></i>",
			snow: "<i class='wi wi-snowflake-cold'></i>",
			mist: "<i class='wi wi-day-haze'></i>"
		};
		var images = {
			//storing images for background depending on icon of api
			clearSkyWarm: "https://images.unsplash.com/photo-1508883686827-76f31b3c9332?auto=format&fit=crop&w=1489&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
			clearSkyCold: "https://images.unsplash.com/photo-1415615693107-186d0530528c?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
			fewCloudsWarm: "https://images.unsplash.com/photo-1505224526312-64368469c1f0?auto=format&fit=crop&w=634&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
			fewCloudsCold: "https://images.unsplash.com/photo-1504202994661-f775b494e6d9?auto=format&fit=crop&w=634&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
			scatteredCloudsWarm: "https://images.unsplash.com/photo-1469196397362-cd5d038a9df8?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
			scatteredCloudsCold: "https://images.unsplash.com/photo-1472642574003-654c0d3ce0a4?auto=format&fit=crop&w=1489&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
			brokenCloudsWarm: "https://images.unsplash.com/photo-1505664762416-e21ed8b4a88e?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
			brokenCloudsCold: "https://images.unsplash.com/photo-1473182446278-fa0683411d10?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
			showerRain: "https://media1.giphy.com/media/3oEdvbelTmMXOQ9VDO/giphy.gif",
			rain: "https://media2.giphy.com/media/l0Iy5fjHyedk9aDGU/giphy.gif",
			thunderstorm: "https://media3.giphy.com/media/j69Ma1PlscvTO/giphy.gif",
			snow: "https://media1.giphy.com/media/OdOfTkw2uVADC/giphy.gif",
			mist: "https://media2.giphy.com/media/xT8qBgwBouvNofiuuA/giphy.gif"
		};
		$.ajax({
			method: "GET",
			url: "https://api.openweathermap.org/data/2.5/weather?&units=imperial",
			data: {
				apikey: APIKEYWEATHER,
				lat: lat,
				lon: long
			},
			success: function(data) {
				console.log("success");
				var Faren = data.main.temp.toFixed(0);
				// var valMin = parseFloat(data.main.temp_min);
				// var farenMin = ((valMin - 273.15) * 1.8) + 32;
				// farenMin = Math.round(farenMin);
				//the following lines store the time for the sunrise and sunset using api times
				var sunriseDate = new Date(data.sys.sunrise * 1000);
				// Hours part from the timestamp
				var sunriseHours = sunriseDate.getHours();
				// Minutes part from the timestamp
				var sunriseMinutes = "0" + sunriseDate.getMinutes();
				// Will display time in 10:30 format
				var sunriseTime = sunriseHours + ':' + sunriseMinutes.substr(-2);
				var sunsetDate = new Date(data.sys.sunset * 1000);
				// Hours part from the timestamp
				var sunsetHours = sunsetDate.getHours();
				// Minutes part from the timestamp
				var sunsetMinutes = "0" + sunsetDate.getMinutes();
				// Will display time in 10:30 format
				var sunsetTime = sunsetHours + ':' + sunsetMinutes.substr(-2);
				//the following lines manipulate the DOM based on the api data
				$('#main').html(data.weather[0].main);
				$('#temp').html(Faren);
				$('#degree').html(String.fromCharCode(176));
				$('#measure').html("F");
				$('#city').html(data.name);
				$('#desc').html(data.weather[0].description);
				$('#sunrise').html(" " + sunriseTime);
				$('#sunset').html(" " + sunsetTime);
				//the following if else statements manipulate the DOM by displaying icons and changing the background 
				if (data.weather[0].icon === "01n" || data.weather[0].icon === "01d") {
					console.log(data.weather[0].icon);
					$('#icon').html(icons.clearSky);
					if (Faren < 50) {
						$('#bgimg').attr("src", images.clearSkyCold);
					} else {
						$('#bgimg').attr("src", images.clearSkyWarm);
					}
				} else if (data.weather[0].icon === "02n" || data.weather[0].icon === "02d") {
					console.log(data.weather[0].icon);
					$('#icon').html(icons.fewClouds);
					if (Faren < 50) {
						$('#bgimg').attr("src", images.fewCloudsCold);
					} else {
						$('#bgimg').attr("src", images.fewCloudsWarm);
					}
				} else if (data.weather[0].icon === "03n" || data.weather[0].icon === "03d") {
					console.log(data.weather[0].icon);
					$('#icon').html(icons.scatteredClouds);
					if (Faren < 50) {
						$('#bgimg').attr("src", images.scatteredCloudsCold);
					} else {
						$('#bgimg').attr("src", images.scatteredCloudsWarm);
					}
				} else if (data.weather[0].icon === "04n" || data.weather[0].icon === "04d") {
					console.log(data.weather[0].icon);
					$('#icon').html(icons.brokenClouds);
					if (Faren < 50) {
						$('#bgimg').attr("src", images.brokenCloudsCold);
					} else {
						$('#bgimg').attr("src", images.brokenCloudsWarm);
					}
				} else if (data.weather[0].icon === "09n" || data.weather[0].icon === "09d") {
					console.log(data.weather[0].icon);
					$('#icon').html(icons.showerRain);
					$('#bgimg').attr("src", images.showerRain);
				} else if (data.weather[0].icon === "10n" || data.weather[0].icon === "10d") {
					console.log(data.weather[0].icon);
					$('#icon').html(icons.rain);
					$('#bgimg').attr("src", images.rain);
				} else if (data.weather[0].icon === "11n" || data.weather[0].icon === "11d") {
					console.log(data.weather[0].icon);
					$('#icon').html(icons.thunderstorm);
					$('#bgimg').attr("src", images.thunderstorm);
				} else if (data.weather[0].icon === "13n" || data.weather[0].icon === "13d") {
					console.log(data.weather[0].icon);
					$('#icon').html(icons.snow);
					$('#bgimg').attr("src", images.snow);
				} else if (data.weather[0].icon === "50n" || data.weather[0].icon === "50d") {
					console.log(data.weather[0].icon);
					$('#icon').html(icons.mist);
					$('#bgimg').attr("src", images.mist);
				}
				//this converts the temp from F to C and vice versa
				$('#convert').click(function() {
					if (document.getElementById("measure").innerHTML === "F") {
						var celsius = (Faren - 32) / 1.8;
						celsius = Math.round(celsius);
						$('#temp').html(celsius);
						$('#measure').html("C");
						$('#buttonText').html("Click to convert to Fahrenheit");
						console.log('first success');
					} else {
						$('#temp').html(Faren);
						$('#measure').html("F");
						$('#buttonText').html("Click to convert to Celsius");
						console.log('second success');
					}
				});
			}
		});
		// this ajax gets the 5 day forecast info
		$.ajax({
			method: "GET",
			url: "https://api.openweathermap.org/data/2.5/forecast?&units=imperial",
			data: {
				apikey: APIKEYWEATHER,
				lat: lat,
				lon: long
			},
			success: function(data3) {
				console.log("5 day forecast output");
				$('#oneDayTime').html(getDate(data3.list[7].dt));
				$('#twoDayTime').html(getDate(data3.list[15].dt));
				$('#threeDayTime').html(getDate(data3.list[23].dt));
				$('#fourDayTime').html(getDate(data3.list[31].dt));
				$('#fiveDayTime').html(getDate(data3.list[38].dt));
				$('#oneDay').html(data3.list[7].weather[0].description);
				$('#twoDay').html(data3.list[15].weather[0].description);
				$('#threeDay').html(data3.list[23].weather[0].description);
				$('#fourDay').html(data3.list[31].weather[0].description);
				$('#fiveDay').html(data3.list[38].weather[0].description);
				//this function gets the day of the week from the unix time in the api
				function getDate(unixTime) {
					var timestamp = unixTime;
					var a = new Date(timestamp * 1000);
					var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
					var dayOfWeek = days[a.getDay()];
					console.log(dayOfWeek);
					return dayOfWeek;
				}
			}
		});
	}
});








