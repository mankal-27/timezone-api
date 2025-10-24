export function formatTimeInfo(data) {
    return {
        city: data.city,
        country: data.countryName,
        timeZone: data.timeZone,
        utcOffset: data.utcOffset,
        localTime: data.localTime,
        isWorkingHours: data.isWorkingHours,
        isHoliday: data.isHoliday,
        nextHoliday: data.nextHoliday || null
    };
}
