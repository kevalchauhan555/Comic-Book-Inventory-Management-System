const ComicBook = require("../models/ComicBook");

exports.addComic = async (req, res) => {
  try {
    const comic = new ComicBook(req.body);
    await comic.save();
    res.redirect("/");
  } catch (err) {
    res
      .status(400)
      .render("error", { message: "Failed to add comic: " + err.message });
  }
};

exports.listComics = async (req, res) => {
  try {
    const comics = await ComicBook.find({});
    res.render("index", { comics });
  } catch (err) {
    res.render("error", { message: "Error retrieving comics: " + err.message });
  }
};

exports.fetchComicById = async (req, res) => {
  try {
    const comic = await ComicBook.findById(req.params.id);
    if (!comic)
      return res.status(404).render("error", { message: "Comic not found." });
    res.render("comicDetails", { comic });
  } catch (err) {
    res.render("error", { message: "Error fetching comic: " + err.message });
  }
};

exports.modifyComic = async (req, res) => {
  try {
    const updatedComic = await ComicBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComic)
      return res.status(404).render("error", { message: "Comic not found." });
    res.redirect("/");
  } catch (err) {
    res
      .status(400)
      .render("error", { message: "Error updating comic: " + err.message });
  }
};

exports.removeComic = async (req, res) => {
  try {
    await ComicBook.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.render("error", { message: "Error deleting comic: " + err.message });
  }
};
