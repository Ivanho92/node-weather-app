const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getCoordonates = require("./utils/geocode");
const getForecast = require("./utils/forecast");

const app = express();

// Defining paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    metaTitle: "Weather App",
    title: "Weather",
    name: "Ivan Rodrigues",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    metaTitle: "About | Weather App",
    title: "About",
    name: "Ivan Rodrigues",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    metaTitle: "Help | Weather App",
    title: "Help",
    helpMessage: "Have you tried restarting your computer ?",
    name: "Ivan Rodrigues",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a location.",
    });
  }

  const address = req.query.address;

  getCoordonates(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error: error });

    getForecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error: error });

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    metaTitle: "404 Error | Weather App",
    title: "404",
    name: "Ivan Rodrigues",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    metaTitle: "404 Error | Weather App",
    title: "404",
    name: "Ivan Rodrigues",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
