import { Result, SearchResult, TvShow } from "../../shared/types.ts";
import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";

/**
 * Search for TV shows by search term
 * @param {string} searchTerm - The search query string.
 * @param {number} [page=1] - The page number for paginated results.
 * @returns {Promise<Result<SearchResult<TvShow>>>}
 */
export async function searchTvShows(searchTerm: string, page = 1) {
  const env = (await load()) ?? Deno.env.toObject();
  let TMDB_API_KEY = env.TMDB_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };
  try {
    const url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
      searchTerm
    )}&include_adult=false&language=en-US&page=${page}`;

    const response = await fetch(url, options);

    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: response.statusText,
      } as Result<SearchResult<TvShow>>;
    }

    const jsonBody = await response.json();

    const searchData = {
      page: jsonBody.page,
      totalPages: jsonBody.total_pages,
      totalResults: jsonBody.total_results,
      results: jsonBody.results.map((result: TvShow) => ({
        id: result.id,
        name: result.name,
        posterPath: result.poster_path || null,
        firstAirDate: result.first_air_date || null,
      })),
    } as SearchResult<TvShow>;

    return {
      success: true,
      data: searchData,
      message: "Search results retrieved successfully.",
    } as Result<SearchResult<TvShow>>;
  } catch (error) {
    console.error("Error fetching TV shows:", error);

    return {
      success: false,
      data: null,
      message: "An error occurred while searching for TV shows.",
    } as Result<SearchResult<TvShow>>;
  }
}
