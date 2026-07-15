import { supabase } from "@/app/utils/supabase/client";
import slugify from "slugify";

export function useEvent() {
  const getEvents = async () => {
    try {
      const { data } = await supabase.from("events").select("*");
      return data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const uploadEvent = async (event) => {
    // upload event image
    let imageUrl = null;

    try {
      if (event.images) {
        const fileExt = event.images[0].name.split(".").pop();
        const filePath = `events/${Date.now()}.${fileExt}`;
        await supabase.storage
          .from("event_images") // Your bucket name
          .upload(filePath, event.images[0], {
            cacheControl: "3600",
            upsert: false, // Set to true to overwrite existing files
          });

        const { data: publicUrlData } = supabase.storage
          .from("event_images")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const slug = slugify(event.title, {
        lower: true,
        strict: true,
      });
      // upload event data
      const { data, error } = await supabase.from("events").insert({
        title: event.title,
        slug: slug,
        description: event.description,
        location_details: event.location,
        start_date: event.date,
        registration_deadline: event.registration_deadline && null,
        capacity: event.capacity,
        status: event.status,
        is_published: true,
        instructor_name: event.instructor_name && null,
        event_link: event.eventLink,
        image: imageUrl,
        category: event.category,
      });

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateEvent = async (event) => {
    try {
      const slug = slugify(event.title, {
        lower: true,
        strict: true,
      });
      const { data, error } = await supabase
        .from("events")
        .update({
          title: event.title,
          slug: slug,
          description: event.description,
          location_details: event.location,
          start_date: event.date,
          registration_deadline: event.registration_deadline && null,
          capacity: event.capacity,
          status: event.status,
          is_published: true,
          instructor_name: event.instructor_name && null,
          event_link: event.eventLink,
          category: event.category,
        })
        .eq("slug", event.slug);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteEvent = async (slug) => {
    await supabase.from("events").delete().eq("slug", slug);
  };

  return { getEvents, uploadEvent, updateEvent, deleteEvent };
}
