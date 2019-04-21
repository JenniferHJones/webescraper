var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var logger = require("morgan");

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// require all models
var db = require("./models");

var PORT = process.env.PORT || 8080;

// initialize Express
var app = express();

// use morgan logger for logging requests
app.use(logger("dev"));

// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// set up routes
var routes = require("./routes");
app.use(routes);

// make public a static folder
app.use(express.static(path.join(__dirname, "public")));

// connect to the Mongo DB
mongoose.connect("mongodb://localhost/webscraper", { useNewUrlParser: true });

// start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});