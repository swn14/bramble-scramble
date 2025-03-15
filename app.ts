// Import Deno standard library modules
import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";
import { getRandomEpisode } from "./use-cases/tv/getRandomEpisode.ts";
import { searchTvShows } from "./use-cases/tv/searchTvShows.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { rateLimit } from "./middleware/rateLimit.ts";

// Load environment variables
const env = await load();
const PORT = parseInt(env.PORT) || 3000;

// API Routes
const router = new Router();

router.get("/api/tv/random-episode", async (ctx) => {
  const url = new URL(ctx.request.url);
  const response = await getRandomEpisode(
    parseInt(url.searchParams.get("seriesId") ?? "")
  );
  ctx.response.body = response;
});

router.get("/api/tv/search", async (ctx) => {
  const url = new URL(ctx.request.url);
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
  ctx.response.body = response;
});

// Start the server
const app = new Application();
app.use(rateLimit);
app.use(router.routes());
app.use(router.allowedMethods());
console.log(`Server running on port ${PORT}`);
await app.listen({ port: PORT });
