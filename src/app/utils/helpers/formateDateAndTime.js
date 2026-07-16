export function formateDateAndTime(inputDate, inputTime) {
  function convertTo24Hour(timeStr) {
    if (!timeStr) {
      return "00:00:00";
    }

    const trimmedTime = timeStr.trim();

    if (/^\d{1,2}:\d{2}$/.test(trimmedTime)) {
      const [hours, minutes] = trimmedTime.split(":");
      return `${String(Number(hours) % 24).padStart(2, "0")}:${minutes}:00`;
    }

    const [time, modifier] = trimmedTime.split(" ");
    let [hours, minutes] = time.split(":");

    hours = Number(hours);
    minutes = minutes || "00";

    if (modifier?.toUpperCase() === "PM" && hours < 12) {
      hours += 12;
    }

    if (modifier?.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${minutes}:00`;
  }

  const time24 = convertTo24Hour(inputTime);
  const combinedDateTimeString = `${inputDate}T${time24}`;
  const dateObject = new Date(combinedDateTimeString);
  const timestampMs = dateObject.getTime();
  const isoString = dateObject.toISOString();

  return { timestampMs, isoString };
}
