var mongoose = require("mongoose");

// Reference to Schema constructor
var Schema = mongoose.Schema;

// Create new user schema object using the constructor
var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    storyUrl: {
        type: String,
        required: true
    }, 
    saved: {
        type: Boolean,
        default: false
    }
});

// Creates model using schema
var Article = mongoose.model("Article", ArticleSchema);

// Exports the model
module.exports = Article;

