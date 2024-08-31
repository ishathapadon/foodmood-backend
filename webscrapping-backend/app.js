const express = require("express");
const cors = require("cors");
const path = require("path");

// Import controllers
const getData = require("./controllers/getData");
const mainPage = require("./controllers/mainpage");
const {
  sendScrapedData,
  updateScrapedData,
} = require("./controllers/scrappedData");
const scrapeTMDBData = require("./controllers/Scraper");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", mainPage);
app.get("/api/data", getData);
app.get("/api/scraper", scrapeTMDBData);
app.get("/api/scraped-data", sendScrapedData); 
app.post("/api/scraped-data", updateScrapedData); 
// Start the server
app.listen(4000, () => {
  console.log("Server started successfully on port 4000!");
});
