"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, MoreHorizontal, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEvent } from "@/app/utils/hooks/useEvent";

const statusStyles = {
  published:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  draft:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  archived:
    "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

const statusLabels = {
  published: "Published",
  draft: "Draft",
  archived: "Archived",
};

function formatDate(value) {
  return new Date(value).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function EventCard({ event, onNavigate }) {
  const router = useRouter();
  const { deleteEvent } = useEvent();

  const handleOpen = () => {
    if (onNavigate) {
      onNavigate(event.slug);
      return;
    }

    router.push(`/dashboard/events/${event.slug}`);
  };

  const handleDelete = async () => {
    await deleteEvent(event.slug);
    router.refresh();
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/30"
      onClick={handleOpen}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />

        <div
          className="absolute right-3 top-3 z-10"
          onClick={(event) => event.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                className="h-8 w-8 rounded-full border border-border/70 bg-background/80 backdrop-blur-sm"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => handleOpen()}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleDelete()}
                variant="destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {event.description}
            </p>
          </div>
          <Badge className={`border ${statusStyles[event.status]}`}>
            {event.status}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-foreground/70" />
            <span>{formatDate(event.start_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-foreground/70" />
            <span>{event.location_details}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="size-4 text-foreground/70" />
            <span>{event.capacity} attendees</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCard;
