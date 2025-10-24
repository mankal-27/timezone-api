import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function getLocationDetails(city, lat, lng) {
    const apiKey = process.env.OPENCAGE_API_KEY;
    let query = "";

    if (lat && lng) query = `${lat}+${lng}`;
    else if (city) query = city;
    else return null;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

    const res = await axios.get(url);
    const result = res.data.results[0];
    if(!result) return null;

    return {
        countryCode: result.components.country_code?.toUpperCase(),
        countryName: result.components.country,
        timeZone: result.annotations.timezone.name,
        utcOffset: result.annotations.timezone.offset_string
    }
}
