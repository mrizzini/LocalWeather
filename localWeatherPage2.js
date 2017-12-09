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
			mist: "https://media2.giphy.com/media/xT8qBgwBouvNofiuuA/giphy.gif",
			defaultPic: "https://images.unsplash.com/photo-1442213391790-7656f6e368b9?auto=format&fit=crop&w=1353&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
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
				$('#main').html(data.weather[0].main);
				$('#temp').html(Faren);
				$('#degree').html(String.fromCharCode(176));
				$('#measure').html("F");
				$('#city').html(data.name);
				$('#desc').html(data.weather[0].description);
				$('#sunrise').html(" " + getSunriseTime(data.sys.sunrise) + "AM ET");
				$('#sunset').html(" " + getSunsetTime(data.sys.sunset) + "PM ET");
	
				function getSunriseTime(sunrise) {
				    var sunriseDate = new Date(sunrise * 1000);
				    // Hours part from the timestamp
				    var sunriseHours = (sunriseDate.getHours() + 24) % 12 || 12;
				    // Minutes part from the timestamp
				    var sunriseMinutes = "0" + sunriseDate.getMinutes();
				    // Will display time in 10:30 format
				    var sunriseTime = sunriseHours + ':' + sunriseMinutes.substr(-2);
				    return sunriseTime;
				}
				function getSunsetTime(sunset) {
				    var sunsetDate = new Date(sunset * 1000);
				    var sunsetHours = (sunsetDate.getHours() + 24) % 12 || 12;
				    var sunsetMinutes = "0" + sunsetDate.getMinutes();
				    var sunsetTime = sunsetHours + ':' + sunsetMinutes.substr(-2);
				    return sunsetTime;
				}
				
				//the following switch manipulates the DOM by displaying icons and changing the background 
				var iconForSwitch = data.weather[0].icon;
                switch (iconForSwitch) {
                	case "01d":
                	case "01n":
                		console.log(data.weather[0].icon + " " + Faren);
                		$('#icon').html(icons.clearSky);
                		if (Faren < 50) {
                			$('#bgimg').attr("src", images.clearSkyCold);
                		} else {
                			$('#bgimg').attr("src", images.clearSkyWarm);
                		}
                		break;
                	case "02d":
                	case "02n":
                		console.log(data.weather[0].icon + " " + Faren);
                		$('#icon').html(icons.fewClouds);
                		if (Faren < 50) {
                			$('#bgimg').attr("src", images.fewCloudsCold);
                		} else {
                			$('#bgimg').attr("src", images.fewCloudsWarm);
                		}
                		break;
                	case "03d":
                	case "03n":
                		console.log(data.weather[0].icon + " " + Faren);
                		$('#icon').html(icons.scatteredClouds);
                		if (Faren < 50) {
                			$('#bgimg').attr("src", images.scatteredCloudsCold);
                		} else {
                			$('#bgimg').attr("src", images.scatteredCloudsWarm);
                		}
                		break;
                	case "04d":
                	case "04n":
                		console.log(data.weather[0].icon + " " + Faren);
                		$('#icon').html(icons.brokenClouds);
                		if (Faren < 50) {
                			$('#bgimg').attr("src", images.brokenCloudsCold);
                		} else {
                			$('#bgimg').attr("src", images.brokenCloudsWarm);
                		}
                		break;
                	case "09d":
                	case "09n":
                		console.log(data.weather[0].icon + " " + Faren);
                		$('#icon').html(icons.showerRain);
                		$('#bgimg').attr("src", images.showerRain);
                		break;
                	case "10d":
                	case "10n":
                		console.log(data.weather[0].icon + " " + Faren);
                		$('#icon').html(icons.rain);
                		$('#bgimg').attr("src", images.rain);
                		break;
                	case "11d":
                	case "11n":
                		console.log(data.weather[0].icon + " " + Faren);
                		$('#icon').html(icons.thunderstorm);
                		$('#bgimg').attr("src", images.thunderstorm);
                		break;
                	case "13d":
                	case "13n":
                		console.log(data.weather[0].icon + " " + Faren);
                		$('#icon').html(icons.snow);
                		$('#bgimg').attr("src", images.snow);
                		break;
                	case "50d":
                	case "50n":
                		console.log(data.weather[0].icon + " " + Faren);
                		$('#icon').html(icons.mist);
                		$('#bgimg').attr("src", images.mist);
                		break;
                	default:
                		$('#bgimg').attr("src", images.defaultPic);
                }

				//this converts the temp from F to C and vice versa
				$('#convert').click(function() {
					if (document.getElementById("measure").innerHTML === "F") {
						var celsius = (Faren - 32) / 1.8;
						celsius = Math.round(celsius);
						$('#temp').html(celsius);
						$('#measure').html("C");
						$('#convert').html("Click to convert to Fahrenheit");
						console.log('first success');
					} else {
						$('#temp').html(Faren);
						$('#measure').html("F");
						$('#convert').html("Click to convert to Celsius");
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








