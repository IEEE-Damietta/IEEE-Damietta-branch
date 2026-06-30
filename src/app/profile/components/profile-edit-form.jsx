"use client";

import { useState } from "react";
import { supabase } from "@/app/supabase";
import { redirect } from "next/navigation";


const ACADEMIC_YEAR_OPTIONS = [
  { value: "first", label: "First Year" },
  { value: "second", label: "Second Year" },
  { value: "third", label: "Third Year" },
  { value: "fourth", label: "Fourth Year" },
  { value: "fifth", label: "Fifth Year" },
];

export function ProfileEditForm({ profile, onUpdated }) {
  const [formData, setFormData] = useState({
    first_name: profile?.first_name ?? "",
    last_name: profile?.last_name ?? "",
    phone: profile?.phone ?? "",
    academic_year: profile?.academic_year ?? "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!profile?.id) return;

    setIsSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("users")
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        academic_year: formData.academic_year,
      })
      .eq("id", profile.id);

    setIsSaving(false);

    if (error) {
      setMessage(error.message || "Unable to update profile.");
      return;
    }

    setMessage("Profile updated successfully.");
    onUpdated?.();
  };

 const handleLogout = async () => {
   await supabase.auth.signOut();
   redirect("/");
   
 };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Edit your details
          </h2>
          <p className="text-sm text-slate-400">
            Update your display name, phone number, and academic year.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span>First name</span>
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Last name</span>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
          <span>Phone</span>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
          <span>Academic year</span>
          <select
            name="academic_year"
            value={formData.academic_year}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0"
          >
            <option value="">Select year</option>
            {ACADEMIC_YEAR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {message ? (
        <p
          className={`text-sm ${message.includes("success") ? "text-emerald-400" : "text-rose-400"}`}
        >
          {message}
        </p>
      ) : null}

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-ieee-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ieee-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>

        <button
          onClick={handleLogout}
          className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Logout
        </button>
      </div>
    </form>
  );
}
