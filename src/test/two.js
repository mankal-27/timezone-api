import { getHolidays } from "../services/holidayService.js";

const test = async () => {
    const holidays = await getHolidays("IN", 2025);
    console.log("Holidays Count:", holidays.length);
    console.log("First Holiday:", holidays[0]?.name);
};
test();
