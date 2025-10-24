// load env vars
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

// routes
import timeInfoRoutes from "./routes/timeinfo.js";
import healthRoutes from "./routes/health.js";
import { apiAuth } from "./middleware/apiAuth.js";
import { apiLimiter} from "./middleware/rateLimiter.js";

app.use("/api", healthRoutes)
app.use("/api", apiLimiter,apiAuth, timeInfoRoutes);
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}).on("error", err => {
    console.error('Server Error:', err.message);
})