'use client'
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CounterBox = ({ icon, alt, target, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 60);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div
      ref={ref}
      className="text-black text-center bg-white rounded-[15px] p-7.5 transition-all duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.1)]"
    >
      <Image
        src={icon}
        alt={alt}
        width={60}
        height={60}
        className="m-auto mb-3"
      />
      <h3 className="counter font-bold text-2xl">{count}+</h3>
      <p>{label}</p>
    </div>
  );
};

const Achievments = () => {
  return (
    <section className="relative py-20 bg-linear-to-r from-blue-700 to-blue-500 overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="container">
        <h1 className="section__header text-center mb-12">Our Acheivments</h1>
        <div className="grid gap-5 mt-10 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          <CounterBox
            icon="/images/icons/members.png"
            alt="members"
            target={500}
            label="Active Members"
          />
          <CounterBox
            icon="/images/icons/calendar.png"
            alt="calendar"
            target={200}
            label="Annual Events"
          />
          <CounterBox
            icon="/images/icons/awards.png"
            alt="awards"
            target={100}
            label="Local Awards"
          />
          <CounterBox
            icon="/images/icons/partners.png"
            alt="partners"
            target={10}
            label="Corporate Partners"
          />
        </div>
      </div>
    </section>
  );
};

export default Achievments;
