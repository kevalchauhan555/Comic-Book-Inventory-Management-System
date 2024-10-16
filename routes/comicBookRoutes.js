const express = require("express");
const {
  addComic,
  listComics,
  fetchComicById,
  modifyComic,
  removeComic,
} = require("../controllers/comicBookController");

const router = express.Router();

router.post("/", addComic);
router.get("/", listComics);
router.get("/:id", fetchComicById);
router.put("/:id", modifyComic);
router.delete("/:id", removeComic);

module.exports = router;
