var fetchWeather = "/weather";
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const dateElement = document.querySelector(".date");
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature');
const locationElement = document.querySelector('.place');
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weatherIcon = document.querySelector(".weatherIcon img");
const weatherDescription = document.querySelector(".weatherDescription");
dateElement.textContent = new Date().getDate() + " " + monthNames[new Date().getMonth()];

// get current location from geolocation API
var lat, lon;
function getLocation() {
	if (navigator.geolocation) {
		console.log("Geolocation is supported by this browser.");
		navigator.geolocation.getCurrentPosition((position) => {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

$(document).ready(function () {
	getLocation();
	// set display of img to none
	$(".weatherIcon img").css("display", "none");
});
var myURL;
$("#curr_loc").click(function () {
	console.log("clicked");
	//change display of img to block
	$(".weatherIcon img").css("display", "block");
	getLocation();
	myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3709f89e826c2838310e77a773533f2d`;
	gps();
});
function gps()
{
	console.log("Latitude: " + lat + " Longitude: " + lon);
	console.log(myURL);
	// make API call to get weather data
	$.ajax({
		url: myURL,
		success: function (data) {
			console.log(data);
			console.log(data.weather[0].description);
			weatherCondition.textContent = data.weather[0].main;
			tempElement.textContent = Math.round(data.main.temp - 273.15) + "°C";
			locationElement.textContent = data.name;
			weatherIcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
			weatherDescription.textContent = data.weather[0].description;
		}
	});
}
weatherForm.addEventListener("submit", (e) => {
	console.log("Form submitted");
	e.preventDefault();
	const location = search.value;
	fetchWeather = `/weather?address=${location}`;
	fetch(fetchWeather).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error);
				locationElement.textContent = data.error;
				weatherCondition.textContent = "";
				tempElement.textContent = "";
				weatherIcon.src = "";
			} else {
				console.log("data =\n", data);
				console.log("temp =\n", data.temperature);
				weatherCondition.textContent = data.description;
				let temp = data.temperature;
				temp=Math.round(temp - 273.15);
				tempElement.textContent = temp + "°C";
				locationElement.textContent = data.location;
				weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.icon}@4x.png`);
			}
		});
	});
  
});