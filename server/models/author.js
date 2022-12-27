const mongoose = require("mongoose");
const AuthorSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  id: { type: String,  },
  books: [{ type: mongoose.Types.ObjectId, ref: "Book"}],
});

module.exports = mongoose.model("Author", AuthorSchema);
