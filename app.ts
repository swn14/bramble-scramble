// Import Deno standard library modules
import { serve } from "https://deno.land/std@0.186.0/http/server.ts";
import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";
import { getRandomEpisode } from "./use-cases/tv/getRandomEpisode.ts";
import { searchTvShows } from "./use-cases/tv/searchTvShows.ts";

// Load environment variables
const env = await load();
const PORT = env.PORT || 3000;

// API Routes
async function handler(req: Request) {
  const url = new URL(req.url);

  if (url.pathname === "/api/tv/random-episode" && req.method === "GET") {
    const response = await getRandomEpisode(
      parseInt(url.searchParams.get("seriesId") ?? "")
    );
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (url.pathname.startsWith("/api/tv/search") && req.method === "GET") {
    const searchTerm = url.searchParams.get("query");
    let pageNumber = 1;

    if (!searchTerm) {
      return new Response(
        JSON.stringify({ error: "Query parameter is required" }),
        { status: 400 }
      );
    }
    if (url.searchParams.get("pageNumber")) {
      pageNumber = parseInt(url.searchParams.get("pageNumber") ?? "") ?? 1;
    }

    const response = await searchTvShows(searchTerm, pageNumber);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
}

// Start the server
console.log(`Server running on port ${PORT}`);
serve(handler, { port: Number(PORT) });
