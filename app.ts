// Import Deno standard library modules
import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";
import { getRandomEpisode } from "./use-cases/tv/getRandomEpisode.ts";
import { searchTvShows } from "./use-cases/tv/searchTvShows.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { rateLimitMiddleware } from "./middleware/rateLimit.ts";
import { apiKeyMiddleware } from "./middleware/apiKey.ts";
import { createApiKey } from "./use-cases/registration/createApiKey.ts";
import process from "node:process";

// Load environment variables
const env = await load();
const PORT = parseInt(env.PORT) || 3000;

process.env.DENO_KV_ACCESS_TOKEN = env.DENO_KV_ACCESS_TOKEN;

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

router.post("/api/registration/api-key", async (ctx) => {
  const requestBody = await ctx.request.body.json();
  const response = await createApiKey(requestBody.emailAddress);
  ctx.response.body = response;
});

// Start the server
const app = new Application();
app.use(async (ctx, next) => {
  const url = ctx.request.url.pathname;
  if (url.startsWith("/api")) {
    await next();
    return;
  }

  let staticRoot = `${Deno.cwd()}/client/build`;
  if (env.ENVIRONMENT !== "local") {
    staticRoot = `${Deno.cwd()}/client-build`;
  }

  console.log(`Looking for static files in: ${staticRoot}`);
  for await (const dirEntry of Deno.readDir(staticRoot)) {
    console.log(dirEntry.name);
  }

  try {
    await ctx.send({
      root: staticRoot,
      index: "index.html",
    });
  } catch {
    // If file not found, return index.html for SPA handling
    await ctx.send({
      root: staticRoot,
      path: "index.html",
    });
  }
});

app.use(rateLimitMiddleware);
app.use(apiKeyMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
console.log(`Server running on port ${PORT}`);
await app.listen({ port: PORT });
