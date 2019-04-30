var mongoose = require("mongoose");

// Reference to Schema constructor
var Schema = mongoose.Schema;

// Create new user schema object using the constructor
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: false
    },
    saved: {
        type: Boolean,
        default: false
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Creates model using schema
var Article = mongoose.model("Article", ArticleSchema);

// Exports the model
module.exports = Article;

