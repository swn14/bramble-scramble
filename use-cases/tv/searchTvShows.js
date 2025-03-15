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
 * Search for TV shows by search term
 * @param {string} searchTerm - The search query string.
 * @param {number} [page=1] - The page number for paginated results.
 * @returns {Promise<Result<SearchResult<TvShow>>>}
 */
async function searchTvShows(searchTerm, page = 1) {
  try {
    const url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
      searchTerm
    )}&include_adult=false&language=en-US&page=${page}`;

    const response = await fetch(url, options);

    if (!response.ok) {
      /** @type {Result<SearchResult<TvShow>>} */
      return {
        success: false,
        data: null,
        message: response.statusText,
      };
    }

    const jsonBody = await response.json();

    /** @type {SearchResult<TvShow>} */
    const searchData = {
      page: jsonBody.page,
      totalPages: jsonBody.total_pages,
      totalResults: jsonBody.total_results,
      results: jsonBody.results.map((result) => ({
        id: result.id,
        name: result.name,
        posterPath: result.poster_path || null,
        firstAirDate: result.first_air_date || null,
      })),
    };

    /** @type {Result<SearchResult<TvShow>>} */
    return {
      success: true,
      data: searchData,
      message: "Search results retrieved successfully.",
    };
  } catch (error) {
    console.error("Error fetching TV shows:", error.message);

    /** @type {Result<SearchResult<TvShow>>} */
    return {
      success: false,
      data: null,
      message: "An error occurred while searching for TV shows.",
    };
  }
}

module.exports = searchTvShows;
