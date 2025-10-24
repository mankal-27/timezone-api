import express from 'express';
const router = express.Router();

router.get("/health", (req, res) => {
    res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date() });
});

export default router;