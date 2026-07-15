import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EventForm from "../components/EventForm";

const statusStyles = {
  published:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  draft:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  archived:
    "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

async function EventDetailPage() {

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/events"
            className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to events
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">
            Create event
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Plan a new experience for your student branch.
          </p>
        </div>
      </div>
      <EventForm />
    </div>
  );
}

export default EventDetailPage;
