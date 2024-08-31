const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../scrappedData.json");

const sendScrapedData = (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading scrappedData.json:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to read scraped data",
      });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json({
        success: true,
        data: jsonData,
      });
    } catch (parseError) {
      console.error("Error parsing scrappedData.json:", parseError.message);
      res.status(500).json({
        success: false,
        message: "Failed to parse scraped data",
      });
    }
  });
};

const updateScrapedData = (req, res) => {
  const newData = req.body;

  // Validate the incoming data (optional, depending on your requirements)
  if (!newData || typeof newData !== "object") {
    return res.status(400).json({
      success: false,
      message: "Invalid data format",
    });
  }

  // Write the new data to scrappedData.json
  fs.writeFile(filePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Error writing to scrappedData.json:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to update scraped data",
      });
    }

    res.json({
      success: true,
      message: "Scraped data has been updated",
    });
  });
};

module.exports = { sendScrapedData, updateScrapedData };
