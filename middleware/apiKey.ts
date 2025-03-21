import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";
import { Context } from "https://deno.land/x/oak@v17.1.4/context.ts";

const ignoredEndpoints = ["/api/registration/api-key"];

export const apiKeyMiddleware = async (
  ctx: Context,
  next: () => Promise<unknown>
) => {
  try {
    const url = new URL(ctx.request.url);
    if (ignoredEndpoints.includes(url.pathname)) {
      await next();
      return;
    }
    const env = await load();
    const clientApiKey = ctx.request.headers.get("X-Api-Key");
    if (!clientApiKey) {
      console.log("[apiKeyMiddleware] Missing API Key Header");
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };
      return;
    }

    const kv = await Deno.openKv(
      env.ENVIRONMENT === "local" ? env.KV_URL : undefined
    );

    const registeredClient = await kv.get([`api-key#${clientApiKey}`]);
    console.log(JSON.stringify(registeredClient));
    if (!registeredClient.value) {
      console.log("[apiKeyMiddleware] Invalid API Key");
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };
      return;
    }
  } catch (error) {
    console.error(error);
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  await next();
};
