const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  writer: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  retailPrice: { type: Number, required: true },
  salePrice: { type: Number },
  totalPages: { type: Number, required: true },
  state: { type: String, enum: ["new", "used"], required: true },
});

module.exports = mongoose.model("ComicBook", comicSchema);
