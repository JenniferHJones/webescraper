// Dependencies
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// scraping tools
// var axios = require("axios");
// var cheerio = require("cheerio");

// require all models
// var db = require("./models");

// Set up the port to be the host's port or local
var PORT = process.env.PORT || 8080;

// Initialize Express App
var app = express();

// Set up Express Router & requires routes file to pass router object
var router = express.Router();
require("./config/routes")(router);

// Every request goes through router middleware
app.use(router);

// Make public a static folder
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to Express app
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Middleware to handle post requests and make available in req.body
app.use(bodyParser.urlencoded({ extended: false }));

// Use deployed db is possible or use local db
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to the db
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Mongoose connection successful");
    }
});

// Listen on the port
app.listen(PORT, function () {
    console.log("App running on port " + PORT);
});