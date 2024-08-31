const mainPage = (req, res) => {
  res.status(200).json({ message: "welcome to the backend" });
};

module.exports = mainPage;
