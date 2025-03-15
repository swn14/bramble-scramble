require("../../shared/types");
require("dotenv").config();

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

/**
 * Get all episodes from each season of a TV show and return a random episode.
 * @param {number} seriesId - The TV series ID.
 * @returns {Promise<Result<RandomEpisode>>}
 */
async function getRandomEpisode(seriesId) {
  try {
    // Fetch the TV show details to get the number of seasons
    const showUrl = `https://api.themoviedb.org/3/tv/${seriesId}`;
    const showResponse = await fetch(showUrl, options);
    const showData = await showResponse.json();

    if (!showData || !showData.number_of_seasons) {
      /** @type {Result<RandomEpisode>} */
      return {
        success: false,
        data: null,
        message: "Invalid series ID or no seasons found.",
      };
    }

    const numberOfSeasons = showData.number_of_seasons;
    let allEpisodes = [];

    // Fetch episodes from each season
    for (let season = 1; season <= numberOfSeasons; season++) {
      const seasonUrl = `https://api.themoviedb.org/3/tv/${seriesId}/season/${season}`;
      const seasonResponse = await fetch(seasonUrl, options);
      const seasonData = await seasonResponse.json();

      if (seasonData.episodes && seasonData.episodes.length > 0) {
        seasonData.episodes.forEach((episode) => {
          allEpisodes.push({
            season,
            episode: episode.episode_number,
            name: episode.name,
            overview: episode.overview,
            imagePath: episode.still_path,
            episodeType: episode.episode_type,
            runtime: episode.runtime,
          });
        });
      }
    }

    if (allEpisodes.length === 0) {
      /** @type {Result<RandomEpisode>} */
      return {
        success: false,
        data: null,
        message: "No episodes found for this series.",
      };
    }

    // Pick a random episode
    const randomEpisode =
      allEpisodes[Math.floor(Math.random() * allEpisodes.length)];

    /** @type {Result<RandomEpisode>} */
    return {
      success: true,
      data: randomEpisode,
      message: "Random episode selected successfully.",
    };
  } catch (error) {
    console.error("Error fetching episodes:", error.message);

    /** @type {Result<RandomEpisode>} */
    return {
      success: false,
      data: null,
      message: "An error occurred while fetching episodes.",
    };
  }
}

module.exports = getRandomEpisode;
