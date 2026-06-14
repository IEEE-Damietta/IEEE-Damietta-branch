import Image from "next/image";
import React from "react";
import { ImEnter } from "react-icons/im";

const EventCard = () => {
  return (
    <div className="card rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-lg text-white transition-all duration-200 hover:-translate-y-1 will-change-transform overflow-hidden">
      {/* <Image
        src="/images/events/event2.jpg"
        alt=""
        className="h-60 w-full object-cover"
        width={60}
        height={60}
      /> */}
      <img
        src="/images/events/event2.jpg"
        className="h-60 w-full object-cover"
        alt=""
      />
      <div className="card_content p-5 text-sm">
        <h3 className="font-bold text-blue-600">IEEE DSB IFTAR 2026</h3>
        <div className="details flex justify-between py-3 border-b border-gray-500">
          <div className="flex items-center gap-2 border-r border-gray-500 flex-1">
            <Image
              src="/images/icons/calendar.png"
              width={16}
              height={16}
              alt="vision"
            />
            <span>
              May 4,2026 <span className="text-blue-600">5:40 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-2 flex-1 pl-2">
            <Image
              src="/images/icons/location.png"
              width={16}
              height={16}
              alt="vision"
            />
            <span> نادي المهندسين</span>
          </div>
        </div>
        <div className="description py-3 border-b border-gray-500">
          join us for a special iftar gathering filled with great food,
          wonderful people ,and unforgettablemoments.
        </div>
        <div className="attending flex items-center gap-2 py-3">
          <Image
            src="/images/icons/attending.png"
            width={16}
            height={16}
            alt="vision"
          />
          <div>
            <span className="text-blue-600">100</span>
            <p>Attending</p>
          </div>
        </div>
        <a
          href="https://www.facebook.com/story.php?story_fbid=896088043233402&id=100084966420663&rdid=ujW7v2NeQxczSfzz#"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-slate-700 to-slate-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-slate-600 hover:to-slate-400 active:scale-95 transition-all duration-200"
        >
          <ImEnter /> Register now
        </a>
      </div>
    </div>
  );
};

export default EventCard;
