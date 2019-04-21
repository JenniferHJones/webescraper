// dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

// root route
router.get("/", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      // If all Notes are successfully found, send them back to the client
      res.render("index", {dbArticle});
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

module.exports = router;
