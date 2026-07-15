import EventsWrapper from "./components/EventsWrapper";
import { createServer } from "@/app/utils/supabase/server";
import { Inbox, Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function Page() {
  const supabase = await createServer();
  const {data} = await supabase.from("events").select("*");
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between p-6">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="size-3.5" />
            Event hub
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Events
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Manage all student branch events.
          </p>
        </div>

        <Button className="rounded-xl">
          <Link href="events/new-event" className="flex gap-2 items-center w-full h-full justify-center">
            <Plus className="size-4" />
            New Event
          </Link>
        </Button>
      </div>

      <EventsWrapper events={data}  />
    </>
  );
}

export default Page;
