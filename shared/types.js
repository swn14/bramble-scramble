/**
 * @template T
 * @typedef {Object} Result
 * @property {boolean} success - Indicates if the request was successful.
 * @property {T | null} data - The response data for this use case.
 * @property {string} [message] - An optional message.
 */

/**
 * @typedef {Object} RandomEpisode
 * @property {number} season - The season number of this episode.
 * @property {number} episode - The episode number.
 * @property {string} name - The title of this episode.
 * @property {string} overview - A description of this episode's plot.
 * @property {string} [imagePath] - The image path for this episode (if available).
 * @property {string} [episodeType] - The type of episode (e.g., "regular", "special").
 * @property {number} [runtime] - Runtime of the episode in minutes.
 */

/**
 * @template T
 * @typedef {Object} SearchResult
 * @property {number} page - The current page number.
 * @property {number} totalPages - The total number of pages.
 * @property {number} totalResults - The total number of results.
 * @property {T[]} results - The array of results.
 */

/**
 * @typedef {Object} TvShow
 * @property {number} id - The unique ID of the TV show.
 * @property {string} name - The name of the TV show.
 * @property {string} [posterPath] - The path to the show's poster image.
 * @property {string} [firstAirDate] - The first air date of the show.
 */

// Exporting an empty object to allow importing this file
module.exports = {};
