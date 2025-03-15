const express = require("express");
const searchTvShows = require("../use-cases/tv/searchTvShows");
const getRandomEpisode = require("../use-cases/tv/getRandomEpisode");
const router = express.Router();

// Define routes
router.get("/search", async (req, res) => {
  const { searchTerm, page } = req.query;
  const response = await searchTvShows(searchTerm, page);
  res.send(response);
});

router.get("/shuffle-series", async (req, res) => {
  const { seriesId } = req.query;
  const response = await getRandomEpisode(seriesId);
  res.send(response);
});

module.exports = router;
