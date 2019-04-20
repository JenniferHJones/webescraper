var mongoose = require("mongoose");

// reference to Schema constructor
var Schema = mongoose.Schema;

// create new note schema object using the constructor
var NoteSchema = new Schema ({
    title: String,
    body: String
});

// creates model using schema
var Note = mongoose.model("Note", NoteSchema);

// exports the model
module.exports = Note;