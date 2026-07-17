"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase/client";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const BookingPanel = ({ dates, user }) => {
  const [selectedSlotId, setSelectedSlotId] = useState({});
  const [reserved, setIsReserved] = useState(null);

  console.log(dates);

  const filteredDates = dates.filter(
    (date) => date.automation_dates_reservations.length < 2,
  );

  useEffect(() => {
    const userReservation = dates.forEach((date) => {
      date.automation_dates_reservations.forEach((usr) => {
        if (usr.user_id == user.id) {
          setSelectedSlotId({
            id: date.id,
            date: new Date(date.date).toLocaleDateString(),
            day: days[new Date(date.date).getDay()],
            hour: new Date(date.date).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          });
          setIsReserved(true);
        }
      });
    });
  }, []);

  const onConfirm = async (id) => {
    if (!selectedSlotId.id) return;

    try {
      const { data: availableData, error: availableError } = await supabase
        .from("automation_dates")
        .select(
          `
    id,
    automation_dates_reservations(user_id)
  `,
        )
        .eq("id", id);

      if (availableData[0].automation_dates_reservations.length >= 2) {
        alert("هذا المعاد ممتلئ بالفعل!");
        return;
      }

      const { data, error } = await supabase
        .from("automation_dates_reservations")
        .insert({
          date_id: selectedSlotId.id,
          user_id: user.id,
        });
      if (!error) setIsReserved(true);
    } catch (error) {
      alert("لم يتم حجز الموعد جرب معاد اخر.");
    }
  };

  const onCancel = async (id) => {
    if (!selectedSlotId) return;
    const { data, error } = await supabase
      .from("automation_dates_reservations")
      .delete()
      .eq("date_id", id);
    if (!error) setIsReserved(false);
  };

  return (
    <main className="container mx-auto px-4 py-12 my-10!">
      <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
        <section className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="space-y-3">
            <p className="inline-flex rounded-full bg-blue-500/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Automation workshop booking
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Reserve your branch workshop date and hour.
            </h1>
            <p className="max-w-2xl text-slate-300">
              Pick the exact day and hour that fits your schedule. Every card
              below is a single slot you can reserve.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-700/80 bg-slate-950/70 p-5 shadow-inner shadow-slate-950/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Choose a slot
                </p>
                <p className="text-xs text-slate-500">
                  Each box is one date-and-hour option.
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                {dates.length} available slots
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {filteredDates.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => {
                    setSelectedSlotId({
                      id: slot.id,
                      date: new Date(slot.date).toLocaleDateString(),
                      day: days[new Date(slot.date).getDay()],
                      hour: new Date(slot.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }),
                    });
                  }}
                  className={`group flex flex-col gap-3 rounded-3xl border p-5 text-left transition-all duration-200 ${
                    selectedSlotId.id === slot.id
                      ? "border-sky-400/40 bg-sky-500/10 shadow-[0_20px_55px_-38px_rgba(56,189,248,0.6)]"
                      : "border-slate-700/80 bg-slate-950/70 hover:border-sky-400/30 hover:bg-slate-900/80"
                  }`}
                >
                  <div>
                    <p className="text-xl font-semibold text-white">
                      {days[new Date(slot.date).getDay()]}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {new Date(slot.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <div className="mt-3 inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-sm font-medium text-sky-300">
                      {new Date(slot.date).toLocaleDateString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="h-fit space-y-6 rounded-[2rem] border border-white/10 bg-linear-to-br from-slate-900/90 to-slate-950/95 p-6 shadow-2xl shadow-slate-950/40">
          {reserved && (
            <div className="rounded-[1.5rem] border border-slate-700/70 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
                Workshop Date Reserved Successfully!
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-900/75 p-5">
                  <p className="text-sm text-slate-400">Date</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {selectedSlotId.day}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/75 p-5">
                  <p className="text-sm text-slate-400">
                    {selectedSlotId.hour}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {selectedSlotId.date}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-[1.5rem] border border-slate-700/70 bg-slate-900/80 p-6 text-center">
            {!reserved ? (
              <>
                <p className="text-sm text-slate-400">
                  Reserve your workshop slot
                </p>
                <button
                  type="button"
                  // onClick={handleReserve}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-sky-500 to-indigo-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition duration-200 hover:scale-[1.01] hover:shadow-sky-500/50 active:scale-95"
                  onClick={() => onConfirm(selectedSlotId.id)}
                >
                  Confirm reservation
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-400">Cancel Registeration!</p>
                <button
                  type="button"
                  // onClick={handleReserve}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-red-400 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition duration-200 hover:scale-[1.01] hover:shadow-red-500/50 active:scale-95"
                  onClick={() => onCancel(selectedSlotId.id)}
                >
                  Cancel Registeration
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default BookingPanel;
