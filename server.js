// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Set up the port to be the host's port or local
var PORT = process.env.PORT || 8080;

// Initialize Express App
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect Handlebars to Express app
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Make public a static folder
app.use(express.static("public"));

// Set up Express Router & requires htmlRoutes file to pass router object
var router = require("./config/routes");

// Every request goes through router middleware
app.use(router);

// Use deployed db if possible or use local db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Listen on the port
app.listen(PORT, function () {
    console.log("App running on port " + PORT);
});