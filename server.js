const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDatabase = require("./config/database");
const comicRoutes = require("./routes/comicBookRoutes");
const ComicBook = require("./models/ComicBook"); // Import the ComicBook model
const path = require("path");
const methodOverride = require("method-override");

const app = express();
connectDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

// Render the inventory page with comics
app.get("/", async (req, res) => {
  try {
    const comics = await ComicBook.find({});
    res.render("index", { comics });
  } catch (error) {
    console.error("Error fetching comics:", error); // Log the error
    res.render("error", { message: "Failed to load comics: " + error.message });
  }
});

// Render the form to add a new comic
app.get("/add", (req, res) => {
  res.render("addComic");
});

// Include the comic routes for API endpoints
app.use("/api/comics", comicRoutes);

const PORT = 7000; // Use environment variable for port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
