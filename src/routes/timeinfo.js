import express from "express";
import { DateTime } from "luxon";
import {getHolidays} from "../services/holidayService.js";
import { getLocationDetails } from "../services/locationService.js";
import { formatTimeInfo } from "../utils/responseFormatter.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/timeinfo", async (req, res) => {
    try {
        const { city, lat, lng } = req.query;
        if(!city && (!lat || !lng)) return res.status(400).json({ error: "City Or Coordinate Required" });

        // 1️⃣ Get location + timezone
        const location = await getLocationDetails(city, lat, lng);
        if(!location) return res.status(404).json({error: "City not found"});

        const { countryCode, countryName, timeZone, utcOffset } = location;

        // 2. Get Holidays (with cache)
        const year = new Date().getFullYear();
        const holidays = await getHolidays(countryCode, year);

        //3. Determine next upcoming holiday
        const today = DateTime.now().setZone(timeZone).toISODate();
        const upcoming = holidays
            .map(h => ({
                name: h.name,
                date: h.date.iso,
            }))
            .filter(h => h.date >= today)
            .sort((a, b) => (a.date > b.date ? 1 : -1))[0];

        //4. Get Local time + working hours
        const localTime = DateTime.now().setZone(timeZone);
        const hour = localTime.hour;

        const WORK_START = Number(process.env.WORK_START || 9);
        const WORK_END = Number(process.env.WORK_END || 18);

        const isWorkingHours = hour >= WORK_START && hour <= WORK_END;

        // 5. Check if today is holiday
        const isHoliday = holidays.some(h => h.date.iso === today);

        const responseData = {
            city,
            countryName,
            timeZone,
            utcOffset,
            localTime: localTime.toISO(),
            isWorkingHours,
            isHoliday,
            nextHoliday: upcoming
        };

        // 6. Combine and send response
        return res.json((formatTimeInfo(responseData)));
    }catch(err) {
        console.error("Error: ",err.message);
        return res.status(500).json({error: "Internal Server Error"});
    }
})

export default router;