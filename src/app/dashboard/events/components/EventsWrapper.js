"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox, Plus, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventCard from "./EventCard";


function EventsWrapper({ events }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [isLoading, setIsLoading] = useState(false);


  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    let result = [...events];

    if (query) {
      result = result.filter((event) =>
        [event.title, event.description, event.location_details].some((value) =>
          value.toLowerCase().includes(query),
        ),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((event) => event.status === statusFilter);
    }

    switch (sortBy) {
      case "oldest":
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "most-attendees":
        result.sort((a, b) => b.attendees - a.attendees);
        break;
      default:
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [events, search, statusFilter, sortBy]);

  const handleNavigate = (eventId) => {
    router.push(`/dashboard/events/${eventId}`);
  };

  return (
    <div className="space-y-8 px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 lg:max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 rounded-xl pl-9"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full rounded-xl sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full rounded-xl sm:w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="most-attendees">Most attendees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm"
            >
              <div className="mb-4 h-36 animate-pulse rounded-xl bg-muted" />
              <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-muted" />
              <div className="mb-2 h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onNavigate={handleNavigate}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-8 py-16 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Inbox className="size-6" />
          </div>
          <h2 className="text-xl font-semibold">No events found</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Try changing the filters or create a new event to get started.
          </p>
          <Button
            className="mt-6 gap-2 rounded-xl"
            onClick={() => handleNavigate("new-event")}
          >
            <Plus className="size-4" />
            Create event
          </Button>
        </div>
      )}
    </div>
  );
}

export default EventsWrapper;
