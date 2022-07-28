const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
	const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherMap.SECRET_KEY;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather service", undefined);
		}
		else if (body.message) {
			callback("Unable to find location", undefined);
		}
		else {
			callback(undefined, {
				temperature: body.main.temp,
				location: body.name,
				description: body.weather[0].description,
				icon: body.weather[0].icon,
			});
		}
	});
}
module.exports = weatherData;