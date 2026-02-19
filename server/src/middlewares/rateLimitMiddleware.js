// rateLimitMiddleware.js

import { tokenBucketRateLimit } from "../utils/helper.js";

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress
  );
}

export const ipRateLimiter = async (req, res, next) => {
  const ip = getClientIp(req);

  const result = await tokenBucketRateLimit(ip);

  if (!result.allowed) {
    return res.status(429).json({
      message: "Too many requests. Please try again later.",
      tokensRemaining: result.tokensRemaining
    });
  }

  next();
};
