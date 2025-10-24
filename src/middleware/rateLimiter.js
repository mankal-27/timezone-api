import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per window
    message:{
        error: "Too many requests, please try again later"
    },
    standardHeaders: true, // return rate limit info in headers
    legacyHeaders: false, // disable old X-RateLimit headers
})