export const WORKSHOP_SLOTS_STORAGE_KEY = "ieee-workshop-slots";

export const DEFAULT_WORKSHOP_SLOTS = [
  {
    id: 1,
    dateLabel: "Mon, Jul 22",
    dayName: "Monday",
    time: "10:00 AM",
    subtitle: "Automation Lab",
    available: true,
  },
  {
    id: 2,
    dateLabel: "Mon, Jul 22",
    dayName: "Monday",
    time: "12:00 PM",
    subtitle: "Automation Lab",
    available: true,
  },
  {
    id: 3,
    dateLabel: "Mon, Jul 22",
    dayName: "Monday",
    time: "02:00 PM",
    subtitle: "Automation Lab",
    available: true,
  },
  {
    id: 4,
    dateLabel: "Tue, Jul 23",
    dayName: "Tuesday",
    time: "09:00 AM",
    subtitle: "Branch Workshop",
    available: true,
  },
  {
    id: 5,
    dateLabel: "Tue, Jul 23",
    dayName: "Tuesday",
    time: "11:00 AM",
    subtitle: "Branch Workshop",
    available: true,
  },
  {
    id: 6,
    dateLabel: "Wed, Jul 24",
    dayName: "Wednesday",
    time: "10:00 AM",
    subtitle: "Sold out",
    available: false,
  },
  {
    id: 7,
    dateLabel: "Thu, Jul 25",
    dayName: "Thursday",
    time: "11:00 AM",
    subtitle: "Most popular",
    available: true,
  },
  {
    id: 8,
    dateLabel: "Thu, Jul 25",
    dayName: "Thursday",
    time: "01:00 PM",
    subtitle: "Most popular",
    available: true,
  },
];

export function getStoredWorkshopSlots() {
  if (typeof window === "undefined") {
    return DEFAULT_WORKSHOP_SLOTS;
  }

  try {
    const stored = window.localStorage.getItem(WORKSHOP_SLOTS_STORAGE_KEY);

    if (!stored) {
      return DEFAULT_WORKSHOP_SLOTS;
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : DEFAULT_WORKSHOP_SLOTS;
  } catch {
    return DEFAULT_WORKSHOP_SLOTS;
  }
}

export function persistWorkshopSlots(slots) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    WORKSHOP_SLOTS_STORAGE_KEY,
    JSON.stringify(slots),
  );
}

export function formatSlotDate(dateValue) {
  if (!dateValue) {
    return { dateLabel: "Choose a date", dayName: "Select day" };
  }

  const normalizedDate = new Date(`${dateValue}T12:00:00`);
  const dateLabel = normalizedDate.toLocaleDateString("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const dayName = normalizedDate.toLocaleDateString("en", {
    weekday: "long",
  });

  return { dateLabel, dayName };
}

export function createWorkshopSlot({ date, time, location, available }) {
  const { dateLabel, dayName } = formatSlotDate(date);

  return {
    id: `${date}-${time}-${Math.random().toString(36).slice(2, 8)}`,
    dateLabel,
    dayName,
    time,
    subtitle: location,
    available,
  };
}
