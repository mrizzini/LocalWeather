/*global $ APIKEY
navigator
APIKEYWEATHER*/

$(document).ready(function() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude; 
            var long = position.coords.longitude;
            showWeather(position);
            // add function to get the weather
        });
            
        } else {
        alert ("Geolocation is not supported by this browser.");
        
    }


    function showWeather(position) {
            var lat = position.coords.latitude; 
            var long = position.coords.longitude;
            // $('#city').html(lat + "<br>" + long);
            
           $.ajax({
                method: "GET",
		        url: "https://api.openweathermap.org/data/2.5/weather",
		        data: { apikey: APIKEYWEATHER, lat: lat, lon: long},
            success: function(data) {
                        console.log("hey");
                
                            valNum = parseFloat(data.main.temp);
                            Faren = ((valNum - 273.15) * 1.8) + 32;
                            Faren = Math.round(Faren);
                            $('#temp').html(Faren + "&#8457;");
                        
                        
			     //  if (data.status == "ok") {
			         //   $('#temp').html(data.main.temp);
			            $('#city').html(data.name);
			            $('#country').html(data.sys.country);
			            $('#desc').html(data.weather[0].description);
			          
				    //  $('#temp').html(data.main.temp);  
				        // document.getElementById("temp").innerHTML = data.main.temp;
			     //   }
            }
            });
            //  $('#city').html(lat);
            
    }
    
    
});


