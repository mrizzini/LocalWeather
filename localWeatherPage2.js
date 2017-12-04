/*global $ APIKEY
navigator
APIKEYWEATHER*/

$(document).ready(function() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            // var lat = position.coords.latitude; 
            // var long = position.coords.longitude;
            showWeather(position);
            // add function to get the weather
        });
            
    } else {
        alert ("Geolocation is not supported by this browser.");
        
    }

    function showWeather(position) {
        var lat = position.coords.latitude; 
        var long = position.coords.longitude;
        var icons = { 
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
            // $('#city').html(lat + "<br>" + long);
        $.ajax({
            method: "GET",
		    url: "https://api.openweathermap.org/data/2.5/weather",
		    data: { apikey: APIKEYWEATHER, lat: lat, lon: long},
            success: function(data) {
                console.log("success");
                
                var valNum = parseFloat(data.main.temp);
                var Faren = ((valNum - 273.15) * 1.8) + 32;
                Faren = Math.round(Faren);
                
                $('#temp').html(Faren);
                $('#tempunit').html("&#8457;");
			    $('#city').html(data.name);
			    $('#country').html(data.sys.country);
			    $('#desc').html(data.weather[0].description);
			    if (data.weather[0].icon === "01n" || data.weather[0].icon === "01d") {
			        console.log(data.weather[0].icon);
			        $('#icon').html(icons.clearSky);
			    }
			     else if (data.weather[0].icon === "02n" || data.weather[0].icon === "02d") {
			        console.log(data.weather[0].icon);
			        $('#icon').html(icons.fewClouds);
			    }
			     else if (data.weather[0].icon === "03n" || data.weather[0].icon === "03d") {
			        console.log(data.weather[0].icon);
			        $('#icon').html(icons.scatteredClouds);
			    }
			    else if (data.weather[0].icon === "04n" || data.weather[0].icon === "04d" ) {
			        console.log(data.weather[0].icon);
			        $('#icon').html(icons.brokenClouds);
			    }
			    else if (data.weather[0].icon === "09n" || data.weather[0].icon === "09d") {
			        console.log(data.weather[0].icon);
			        $('#icon').html(icons.showerRain);
			    }
			    else if (data.weather[0].icon === "10n" || data.weather[0].icon === "10d") {
			        console.log(data.weather[0].icon);
			        $('#icon').html(icons.rain);
			    }
			    else if (data.weather[0].icon === "11n" || data.weather[0].icon === "11d") {
			        console.log(data.weather[0].icon);
			        $('#icon').html(icons.thunderstorm);
			    }
			    else if (data.weather[0].icon === "13n" || data.weather[0].icon === "13d") {
			        console.log(data.weather[0].icon);
			        $('#icon').html(icons.snow);
			    }
			    else if (data.weather[0].icon === "50n" || data.weather[0].icon === "50d") {
			        console.log(data.weather[0].icon);
			        $('#icon').html(icons.mist);
			    }
            
        $('#convert').submit(function(event) {
            event.preventDefault();
            console.log(document.getElementById('tempunit').innerHTML);
        //   if (document.getElementById('tempunit').innerHTML == '&#8457') {
            var celcius = (Faren - 32) / 1.8;
            celcius = Math.round(celcius);
            console.log(celcius);
            $('#temp').html(celcius + "&#8451;");
        //   }
            
         
        
        
            
        }); 
        
    }
            
            });
            
   
    
    }
}); 



// <i class="wi wi-day-rain"></i>

// var icons = {
//   clearSky: "wi-day-sunny",  
//   fewClouds: "wi wi-day-cloudy",
//   scatteredClouds: "wi wi-cloudy",
//   brokenClouds: "wi wi-cloud",
//   showerRain: "wi wi-raindrops",
//   rain: "wi wi-rain",
//   thunderstorm: "wi wi-thunderstorm",
//   snow: "wi wi-snowflake-cold",
//   mist: "wi wi-day-haze"
// };




