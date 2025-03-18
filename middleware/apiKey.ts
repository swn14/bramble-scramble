import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";
import { Context } from "https://deno.land/x/oak@v17.1.4/context.ts";

const ignoredEndpoints = ["/api/registration/api-key"];

export const apiKeyMiddleware = async (
  ctx: Context,
  next: () => Promise<unknown>
) => {
  const url = new URL(ctx.request.url);
  if (ignoredEndpoints.includes(url.pathname)) {
    await next();
    return;
  }
  const env = await load();
  const clientApiKey = ctx.request.headers.get("x-api-key");
  if (!clientApiKey) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  const kv = await Deno.openKv(env.KV_URL);
  const registeredClient = await kv.get([`api-key#${clientApiKey}`]);
  if (!registeredClient.value) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  await next();
};
