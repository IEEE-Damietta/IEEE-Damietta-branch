"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CalendarDays,
  ImagePlus,
  MapPin,
  Sparkles,
  UploadCloud,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useEvent } from "@/app/utils/hooks/useEvent";
import { useRouter } from "next/navigation";

const eventFormSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters."),
    description: z
      .string()
      .trim()
      .min(20, "Description must be at least 20 characters."),
    date: z.string().min(1, "Please choose a date."),
    location: z.string().trim().min(2, "Location is required."),
    category: z.enum(["event", "workshop"], {
      required_error: "Please select a category.",
    }),
    status: z.enum(["active", "ended"], {
      required_error: "Please select a status.",
    }),
    registrationDeadline: z.string().optional(),
    capacity: z.string().or(z.number()),
    instructor: z.string().optional(),
    eventLink: z.string(),
    images: z.array(z.any()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.category === "workshop") {
      if (!data.registrationDeadline) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["registrationDeadline"],
          message: "Registration deadline is required for workshops.",
        });
      }

      if (!data.capacity || Number(data.capacity) < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["capacity"],
          message: "Capacity must be at least 1.",
        });
      }
    }
  });

const EventForm = ({ eventValues = {}, update = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { uploadEvent, updateEvent } = useEvent();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: eventValues.title,
      description: eventValues.description,
      date: eventValues.start_date?.split("T")[0],
      location: eventValues.location_details,
      category: eventValues.category,
      registrationDeadline: eventValues.registrationDeadline,
      capacity: eventValues.capacity,
      status: eventValues.status,
      instructor: eventValues.instructor,
      eventLink: eventValues.event_link,
      images: [],
    },
  });

  const selectedCategory = watch("category");
  const selectedStatus = watch("status");
  const selectedImages = watch("images") || [];
  const isWorkshop = selectedCategory === "workshop";

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const imagePreviews = useMemo(() => {
    return selectedImages.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
  }, [selectedImages]);

  const handleFiles = (files) => {
    const acceptedFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (acceptedFiles.length !== files.length) {
      setUploadError("Only image files are supported.");
      return;
    }

    const limitedFiles = acceptedFiles.slice(0, 5);
    setValue("images", limitedFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setUploadError("");
  };

  const openPicker = () => fileInputRef.current?.click();

  const onSubmit = async (values) => {
    let result;
    if (update) {
      result = await updateEvent(values);
    } else {
      result = await uploadEvent(values);
    }

    if (!result.success) {
      setError("root", {
        message: result.error,
      });
      return;
    }

    router.push("/dashboard/events");
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove,
    );
    setValue("images", updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setUploadError("");
  };

  return (
    <Card className="rounded-2xl border-border/70 bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle>Event information</CardTitle>
        <CardDescription>
          Create a polished event experience with rich details and image
          uploads.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input
              {...register("title")}
              placeholder="Event title"
              className="h-11 rounded-xl"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              {...register("description")}
              placeholder="Describe the experience"
              className="min-h-32 rounded-xl"
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Date
              </label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("date")}
                  type="date"
                  className="h-11 rounded-xl pl-9"
                />
              </div>
              {errors.date && (
                <p className="text-sm text-destructive">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Location
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("location")}
                  placeholder="Location"
                  className="h-11 rounded-xl pl-9"
                />
              </div>
              {errors.location && (
                <p className="text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Event images
            </label>
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragActive(false);
                handleFiles(event.dataTransfer.files);
              }}
              className={`rounded-2xl border border-dashed p-4 transition-all duration-300 ${dragActive ? "border-primary bg-primary/5 shadow-sm" : "border-border/70 bg-muted/20"}`}
            >
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-background/70 px-4 py-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Drop files here or browse
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Maximum file upload size is 5MB file.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={openPicker}
                >
                  <ImagePlus className="mr-2 size-4" />
                  Choose files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(event) => handleFiles(event.target.files)}
                />
              </div>

              {uploadError ? (
                <p className="mt-3 text-sm text-destructive">{uploadError}</p>
              ) : null}

              {errors.images ? (
                <p className="mt-3 text-sm text-destructive">
                  {errors.images.message}
                </p>
              ) : null}

              {imagePreviews.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {imagePreviews.map((image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="overflow-hidden rounded-xl border border-border/70 bg-background/80"
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="h-24 w-full object-cover"
                      />
                      <div className="flex items-center justify-between gap-2 px-3 py-2 text-sm">
                        <span className="truncate text-muted-foreground">
                          {image.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-border/70 bg-muted/20 p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Category
            </label>
            <Select
              value={selectedCategory}
              onValueChange={(value) =>
                setValue("category", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setValue("status", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive">
                {errors.status.message}
              </p>
            )}
          </div>

          {isWorkshop && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Registration deadline
                </label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...register("registrationDeadline")}
                    type="date"
                    className="h-11 rounded-xl pl-9"
                  />
                </div>
                {errors.registrationDeadline && (
                  <p className="text-sm text-destructive">
                    {errors.registrationDeadline.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Instructor Name
                </label>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...register("instructor")}
                    type="text"
                    placeholder="instructor name"
                    className="h-11 rounded-xl pl-9"
                  />
                </div>
                {errors.instructor && (
                  <p className="text-sm text-destructive">
                    {errors.instructor.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Capacity
            </label>
            <div className="relative">
              <Users className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...register("capacity")}
                type="number"
                min="1"
                placeholder="120"
                className="h-11 rounded-xl pl-9"
              />
            </div>
            {errors.capacity && (
              <p className="text-sm text-destructive">
                {errors.capacity.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Event Link
            </label>
            <div className="relative">
              <Input
                {...register("eventLink")}
                type="text"
                placeholder="Event Link"
                className="h-11 rounded-xl"
              />
            </div>
            {errors.eventLink && (
              <p className="text-sm text-destructive">
                {errors.eventLink.message}
              </p>
            )}
          </div>

          {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

          <div className="flex gap-3">
            <Button
              type="button"
              className="rounded-xl"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventForm;
