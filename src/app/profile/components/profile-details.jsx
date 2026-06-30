import { ProfileField } from "./profile-field";
import { ProfileEditForm } from "./profile-edit-form";

const FACULTY_LABELS = {
  cs: "Computer Science",
  engineering: "Engineering",
  other: "Other",
};

const ACADEMIC_YEAR_LABELS = {
  first: "First Year",
  second: "Second Year",
  third: "Third Year",
  fourth: "Fourth Year",
  fifth: "Fifth Year",
};

export function ProfileDetails({ profile, userEmail, onProfileUpdated }) {
  const fullName = profile
    ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim()
    : "Not set";

  if (!profile) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-center text-slate-300 shadow-xl shadow-black/20">
        <p className="text-lg font-medium text-white">No profile data found.</p>
        <p className="mt-3 text-sm text-slate-400">
          Please sign in or complete your registration to view your account
          details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProfileField label="Name" value={fullName} />
        <ProfileField label="Username" value={profile.first_name ?? "-"} />
        <ProfileField label="Email" value={userEmail ?? "-"} />
        <ProfileField label="Password" value="********" />
        <ProfileField label="Phone" value={profile.phone ?? "-"} />
        <ProfileField label="National ID" value={profile.national_id ?? "-"} />
        <ProfileField
          label="University ID"
          value={profile.university_id ?? "-"}
        />
        <ProfileField
          label="Faculty"
          value={FACULTY_LABELS[profile.faculty] ?? "-"}
        />
        <ProfileField
          label="Academic Year"
          value={ACADEMIC_YEAR_LABELS[profile.academic_year] ?? "-"}
        />
      </div>

      <ProfileEditForm profile={profile} onUpdated={onProfileUpdated} />
    </div>
  );
}
