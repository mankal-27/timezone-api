import axios from "axios";
import { getCache, setCache }  from "../utils/cache.js";

import dotenv from "dotenv";
dotenv.config();

export async function getHolidays(countryCode,year){
    const key = `${countryCode}-${year}`;
    const cached = await getCache(key);

    if(cached){
        console.log("Serving From cache: ", key);
        return cached;
    }

    try {
        // Step2: Call calendarific API
        const apiKey = process.env.CALENDARIFIC_API_KEY;
        const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${countryCode}&year=${year}`;
        const response = await axios.get(url);

        const holidays = response.data.response.holidays;

        //Step3: Store in cache
        // Save to cache with TTL (24 hours default)
        setCache(key, holidays);

        return holidays;
    }catch (error) {
        console.error("❌ Error fetching holidays:", error.message);
        return [];
    }
}