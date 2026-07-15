import Link from "next/link";
import EventForm from "../components/EventForm"
import { ArrowLeft } from "lucide-react";
import { createServer } from "@/app/utils/supabase/server"; 

async function EventDetailPage({params}) {
  const {slug} = await params;
  const supabase = await createServer();
  const {data: eventDetails} = await supabase.from('events').select("*").eq('slug', slug).single();
  console.log(eventDetails);
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
            Event details
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update the event details and publishing state.
          </p>
        </div>
      </div>

      <EventForm eventValues={eventDetails} update={true} />
    </div>
  );
}

export default EventDetailPage;
