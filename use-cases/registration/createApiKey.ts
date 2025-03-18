import { randomUUID } from "node:crypto";
import { Result } from "../../shared/types.ts";
import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";
import process from "node:process";

/**
 * Creates an API key that can be used for subsequent client requests
 * @param {string} email - The search query string.
 * @returns {Promise<Result<string>>}
 */
export async function createApiKey(email: string) {
  console.log("[createApiKey] Creating... ***");
  try {
    const env = await load();
    if (!isValidEmail(email)) {
      return {
        success: false,
        data: null,
        message: "Invalid email address",
      } as Result<string>;
    }
    const kv = await Deno.openKv(env.DENO_KV_URL);
    const apiKey = randomUUID();
    const expirationDate = getFutureDateInMs(
      parseInt(env.API_KEY_EXPIRATION_IN_DAYS)
    );

    const result = await kv.set(
      [`api-key#${apiKey}`],
      { email, apiKey },
      { expireIn: expirationDate }
    );
    if (!result.ok) {
      return {
        success: false,
        data: null,
        message: "Failed to create API key.",
      } as Result<string>;
    }

    console.log(
      `[createApiKey] Successfully created API key for ${email}. ***`
    );
    return {
      success: true,
      data: apiKey,
      message: "Successfully created API key.",
    } as Result<string>;
  } catch (error) {
    console.error("[createApiKey] Error creating API key:", error);

    return {
      success: false,
      data: null,
      message: "An error occurred while trying to create an API key.",
    } as Result<unknown>;
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getFutureDateInMs(days: number): number {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).getTime();
}
