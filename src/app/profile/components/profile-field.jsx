export function ProfileField({ label, value, hint }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
      <p className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="whitespace-pre-wrap text-base text-slate-100">
        {value ?? hint ?? "Not available"}
      </p>
    </div>
  );
}
