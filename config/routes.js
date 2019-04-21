module.exports = function (router) {
  // Root page route
  router.get("/", function (req, res) {
    res.render("home");
  });
  // Saved articles route
  router.get("/articles", function (req, res) {
    res.render("articles");
  });
}
