var mongoose = require("mongoose");

// reference to Schema constructor
var Schema = mongoose.Schema;

// create new user schema object using the constructor
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
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

