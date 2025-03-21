import { Context } from "https://deno.land/x/oak@v17.1.4/context.ts";

const requestCounts = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 200;
const WINDOW_MS = 60 * 1000;

export const rateLimitMiddleware = async (
  ctx: Context,
  next: () => Promise<unknown>
) => {
  const ip = ctx.request.ip || "unknown";
  const now = Date.now();

  let userData = requestCounts.get(ip);

  if (!userData || now - userData.lastReset > WINDOW_MS) {
    userData = { count: 0, lastReset: now };
  }

  userData.count++;

  // **Ensure the updated userData is set before checking limit**
  requestCounts.set(ip, userData);

  if (userData.count > RATE_LIMIT) {
    console.log("[rateLimitMiddleware] Too many requests");
    ctx.response.status = 429;
    ctx.response.body = { error: "Too many requests" };
    return;
  }

  await next();
};
