const requestCounts = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 200;
const WINDOW_MS = 60 * 1000;

export const rateLimit = async (ctx: any, next: any) => {
  const ip = ctx.request.ip || "unknown";
  const now = Date.now();

  let userData = requestCounts.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > WINDOW_MS) {
    userData = { count: 0, lastReset: now };
  }

  userData.count++;

  if (userData.count > RATE_LIMIT) {
    ctx.response.status = 429;
    ctx.response.body = { error: "Too many requests" };
    return;
  }

  requestCounts.set(ip, userData);
  await next();
};
