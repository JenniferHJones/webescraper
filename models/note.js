var mongoose = require("mongoose");

// Reference to Schema constructor
var Schema = mongoose.Schema;

// Create new note schema object using the constructor
var NoteSchema = new Schema ({
    text: String
});

// Creates model using schema
var Note = mongoose.model("Note", NoteSchema);

// Exports the model
module.exports = Note;