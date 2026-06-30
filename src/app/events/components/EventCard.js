import Image from "next/image";
import React from "react";
import { ImEnter } from "react-icons/im";

const EventCard = ({
  title,
  startDate,
  description,
  locationDetails,
  capacity,
  image,
  eventLink,
}) => {
  const eventDate = new Date(startDate);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="card rounded-2xl bg-white/10 border border-white/15 shadow-lg text-white transition-all duration-200 hover:-translate-y-1 will-change-transform overflow-hidden">
      <img src={image} className="h-60 w-full object-cover" alt="" />
      <div className="card_content p-5 text-sm">
        <h3 className="font-bold text-blue-600">{title}</h3>
        <div className="details flex justify-between py-3 border-b border-gray-500">
          <div className="flex items-center gap-2 border-r border-gray-500 flex-1">
            <Image
              src="/images/icons/calendar.png"
              width={16}
              height={16}
              alt="vision"
            />
            <span>
              {formattedDate}{" "}
              <span className="text-blue-600">{formattedTime}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 flex-1 pl-2">
            <Image
              src="/images/icons/location.png"
              width={16}
              height={16}
              alt="vision"
            />
            <span>{locationDetails}</span>
          </div>
        </div>
        <div className="description py-3 border-b border-gray-500">
          {description}
        </div>
        <div className="attending flex items-center gap-2 py-3">
          <Image
            src="/images/icons/attending.png"
            width={16}
            height={16}
            alt="vision"
          />
          <div>
            <span className="text-blue-600">{capacity}</span>
            <p>Attending</p>
          </div>
        </div>
        <a
          href={eventLink}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-slate-700 to-slate-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-slate-600 hover:to-slate-400 active:scale-95 transition-all duration-200"
        >
          <ImEnter /> Read More
        </a>
      </div>
    </div>
  );
};

export default EventCard;
