const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const scrapeTMDBData = async (req, res) => {
  try {
    const url = "https://jimbuthakali.com/menu";
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const data = [];

    // Scrape the food name, price, link, and image URL
    $("li.btn").each((index, element) => {
      const foodName = $(element).find(".food-name").text().trim();
      const foodPrice = $(element).find(".food-price p").text().trim();
      const imageUrl = $(element).find("img.lazy").attr("src");

      data.push({
        name: foodName,
        price: foodPrice,
        imageUrl: imageUrl,
      });
    });

    // Save the scraped data to scrappedData.json
    fs.writeFileSync("scrappedData.json", JSON.stringify(data, null, 2));

    res.json({
      success: true,
      message: "Scraped data has been saved to scrappedData.json",
      data: data,
    });
  } catch (error) {
    console.error("Error scraping data:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to scrape data",
    });
  }
};

module.exports = scrapeTMDBData;
