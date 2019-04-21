var mongoose = require("mongoose");

// reference to Schema constructor
var Schema = mongoose.Schema;

// create new user schema object using the constructor
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
    storyUrl: {
        type: String,
        required: true
    }, 
    saved: {
        type: Boolean,
        default: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// creates model using schema
var Article = mongoose.model("Article", ArticleSchema);

// exports the model
module.exports = Article;

