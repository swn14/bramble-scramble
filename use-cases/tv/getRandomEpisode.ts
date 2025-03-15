// require("../../shared/types");
// require("dotenv").config();

import { RandomEpisode, Result, TmdbEpisode } from "../../shared/types.ts";
import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";

/**
 * Get all episodes from each season of a TV show and return a random episode.
 * @param {number} seriesId - The TV series ID.
 * @returns {Promise<Result<RandomEpisode>>}
 */
export async function getRandomEpisode(seriesId: number) {
  const env = await load();
  const TMDB_API_KEY = env.TMDB_API_KEY ?? Deno.env.get("TMDB_API_KEY");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };
  try {
    // Fetch the TV show details to get the number of seasons
    const showUrl = `https://api.themoviedb.org/3/tv/${seriesId}`;
    const showResponse = await fetch(showUrl, options);
    const showData = await showResponse.json();

    if (!showData || !showData.number_of_seasons) {
      return {
        success: false,
        data: null,
        message: "Invalid series ID or no seasons found.",
      } as Result<RandomEpisode>;
    }

    const numberOfSeasons = showData.number_of_seasons;
    const allEpisodes: RandomEpisode[] = [];

    // Fetch episodes from each season
    for (let season = 1; season <= numberOfSeasons; season++) {
      const seasonUrl = `https://api.themoviedb.org/3/tv/${seriesId}/season/${season}`;
      const seasonResponse = await fetch(seasonUrl, options);
      const seasonData = await seasonResponse.json();

      if (seasonData.episodes && seasonData.episodes.length > 0) {
        seasonData.episodes.forEach((episode: TmdbEpisode) => {
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
      return {
        success: false,
        data: null,
        message: "No episodes found for this series.",
      } as Result<RandomEpisode>;
    }

    // Pick a random episode
    const randomEpisode =
      allEpisodes[Math.floor(Math.random() * allEpisodes.length)];

    return {
      success: true,
      data: randomEpisode,
      message: "Random episode selected successfully.",
    } as Result<RandomEpisode>;
  } catch (error: unknown) {
    console.error("Error fetching episodes:", error);

    return {
      success: false,
      data: null,
      message: "An error occurred while fetching episodes.",
    } as Result<RandomEpisode>;
  }
}
