// Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

// HTML root page route
router.get("/", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      var scrapedArticles = dbArticle;
      var articleObj = {
        articles: dbArticle
      };
      res.render("home", articleObj);
    })
    .catch(function (err) {
      res.json(err);
    })
});

// HTML saved articles route
router.get("/saved", function (req, res) {
  db.Article.find({ saved: true })
    .then(function (scrapedArticles) {
      var articleObj = {
        articles: scrapedArticles
      };
      res.render("saved", articleObj);
    })
    .catch(function (err) {
      res.json(err);
    })
});

// Route to scrape news website
router.get("/scrape", function (req, res) {
  console.log("Running scrape");

  axios.get("https://www.dailydemocrat.com").then(function (response) {
    var $ = cheerio.load(response.data);

    $(".entry-title").each(function (i, element) {
      // Save to an empty object
      var result = {};

      // Add title and link for each article and save to result object
      result.title = $(this)
        .children(".article-title")
        .text()
        .trim();
      result.link = $(this)
        .children("a")
        .attr("href");
      result.summary = $(this)
        .children(".excerpt")
        .text()
        .trim();

      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
})

// Route to get all articles from db
router.get("/articles", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Route to save an article
router.put("/save/:id", function (req, res) {
  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Route to remove an article from saved
router.put("/remove/:id", function (req, res) {
  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Route for getting specific article by id to add a note
router.get("/articles/:id", function (req, res) {
  db.Article.findOne({ _id: req.params.id })
  .populate('note')
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Route for saving/updating notes associated with the article
router.post("/note/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function (dbNote) {
      // If note was created successfully, find the article with id matching req.params.id & associate it with the note
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id } }, { new: true });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.delete("/note/:id", function (req, res) {
  // Create a new note with req.body as the text
  db.Note.deleteOne({ _id: req.params.id })
    .then(function (dbNote) {
      return db.Article.findOneAndUpdate({ note: req.params.id }, { $pullAll: [{ note: req.params.id }] });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;