const mongoose = require("mongoose");
//    { name: "NOWG1", genre: "Fantasy1", id: "1", authorId: "1" },
const BookSchema = mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  id: { type: String},
  authorId: { type: String, required: true },
});

module.exports = mongoose.model("Book", BookSchema);
