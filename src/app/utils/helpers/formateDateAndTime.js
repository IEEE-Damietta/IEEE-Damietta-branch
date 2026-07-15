export function formateDateAndTime(inputDate, inputTime) {
  // 2. دالة بسيطة لتحويل الوقت لصيغة 24 ساعة (عشان الـ Date يفهمها صح)
  function convertTo24Hour(timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier.toUpperCase() === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`; // HH:mm:ss
  }

  const time24 = convertTo24Hour(inputTime); // هتحولها لـ 10:00:00

  // 3. دمج التاريخ والوقت في صيغة ISO string
  const combinedDateTimeString = `${inputDate}T${time24}`; // "2026-07-15T10:00:00"

  // 4. إنشاء الـ Date Object وتحويله لـ Timestamp
  const dateObject = new Date(combinedDateTimeString);

  // خيارات الإرسال للداتابيز:
  const timestampMs = dateObject.getTime(); // ميللي ثانية (مثالي لـ MongoDB أو Firebase)
  const isoString = dateObject.toISOString(); // صيغة ISO (مثالية لـ PostgreSQL أو MySQL)

    return {timestampMs, isoString};
}

