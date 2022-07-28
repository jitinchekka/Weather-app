const express = require("express");
const hbs = require("hbs");
const { Session } = require("inspector");
const path = require("path");
const weatherData = require("../utils/weatherData");
const app = express();

const port = process.env.PORT || 3000;
const publicStaticDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDir));
var session = require("express-session");
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 10 * 60 * 60 * 24 * 7,
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		},
	})
);


app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		year: new Date().getFullYear(),
	});
}
);

app.get("/weather", (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error: "You must provide an address",
		});
	}
	weatherData(address, (error, data) => {
		if (error) {
			return res.send({ error });
		}
		res.send({
			location: data.location,
			temperature: data.temperature,
			description: data.description,
			icon: data.icon,
		});
		console.log(data);
	});
}
);

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		year: new Date().getFullYear(),
		errorMessage: "Page not found",
	});
}
);
app.listen(port, () => {
  console.log("App is running on port ", port);
});
