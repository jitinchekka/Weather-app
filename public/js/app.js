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

weatherForm.addEventListener("submit", (e) => {
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