"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, MapPin, Sparkles, Trash2 } from "lucide-react";
import { supabase } from "@/app/utils/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formateDateAndTime } from "@/app/utils/helpers/formateDateAndTime";

const timeOptions = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "05:00 PM",
  "05:15 PM",
  "06:00 PM",
  "06:45 PM",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AutomationWorkshopForm = ({ dates }) => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!date) {
      return;
    }

    try {
      const { data, error } = await supabase.from("automation_dates").insert({
        date: formateDateAndTime(date, time).isoString,
      });
      router.refresh();
    } catch (error) {
      console.log("validation error", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await supabase
        .from("automation_dates")
        .delete()
        .eq("id", id);
      router.refresh();
    } catch (error) {
      console.log("deletion error", error.message);
    }
  };

  const checkSlotAvailable = (slot) => {
    if (slot.automation_dates_reservations.length >= 2) {
      return false;
    }
    return true;
  };

  const renderUserbyId = async (id) => {
    const { data } = await supabase.from("profiles").select("username");
    return data.username;
  };

  return (
    <Card className="rounded-2xl border-border/70 bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          Automation workshop slots
        </CardTitle>
        <CardDescription>
          Create workshop dates and hours that will appear in the public booking
          panel.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-border/70 bg-muted/20 p-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Workshop date
            </label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="h-11 rounded-xl pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Workshop hour
            </label>
            <div className="relative">
              <Clock3 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="h-11 rounded-xl pl-9">
                  <SelectValue placeholder="Choose an hour" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full rounded-xl">
            Add workshop slot
          </Button>
        </form>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Current slots
              </p>
              <p className="text-sm text-muted-foreground">
                Manage the workshop dates that users can reserve.
              </p>
            </div>
            <Badge variant="secondary" className="rounded-full">
              {dates.length} total
            </Badge>
          </div>

          <div className="space-y-3">
            {dates.map((slot) => (
              <div
                key={slot.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-background/80 p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">
                      {days[new Date(slot.date).getDay()]}
                    </p>
                    <Badge
                      variant={
                        checkSlotAvailable(slot) ? "default" : "secondary"
                      }
                      className={
                        checkSlotAvailable(slot)
                          ? "rounded-full"
                          : "rounded-full bg-muted text-muted-foreground"
                      }
                    >
                      {checkSlotAvailable(slot) ? "Available" : "Sold out"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(slot.date).toLocaleDateString()} -{" "}
                    {new Date(slot.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  {slot.automation_dates_reservations.length != 0 && (
                    <ul>
                      Reserved by:
                      {slot.automation_dates_reservations.map((user) => (
                        <li key={user.user_id}>{user.profiles.username}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => handleDelete(slot.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationWorkshopForm;
