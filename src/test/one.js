import { getCountryCodeFromCity } from "../services/locationService.js";

const test = async () => {
    const code = await getCountryCodeFromCity("Tokyo");
    console.log("Country Code:", code);
};
test();
