export function ProfileHeader({ fullName, email }) {
  return (
    <div className="mb-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
            Profile
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Hello, {fullName}
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Welcome back to your IEEE Damietta profile. Here you can review your
            account details and the information you provided during
            registration.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-right shadow-xl shadow-black/20">
          <p className="text-sm text-slate-400">Signed in as</p>
          <p className="mt-2 text-lg font-medium text-white">{email}</p>
        </div>
      </div>
    </div>
  );
}
