'use client'
import {useEffect, useState} from 'react'
import EventCard from "./EventCard";
import {supabase} from '../../supabase'
import SelectInput from "../components/SelectInput"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { CiSearch } from "react-icons/ci"

import { Spinner } from "@/components/ui/spinner"


const EventsWrapper = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState(null);
    const [searchMode, setSearchMode] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase.from("events").select("*");

            console.log(data);
            setEvents(data);
            setIsLoading(false);
        }

        fetchEvents();
    }, [])

    const handleSearch = e => {
      setSearch(e.target.value.toLowerCase());

      if (e.target.value == "") {
        setSearchMode(false);
      } else {
        setSearchMode(true);
      }
    }

    useEffect(() => {
      const filtered = events?.filter((event) => {
        const eventTitle = event.title.toLowerCase();
        return eventTitle.includes(debouncedSearch);
      });

      setFilteredEvents(filtered);
    }, [search, debouncedSearch]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebouncedSearch(search);
      }, 300)

      return () => clearTimeout(timeout);
    }, [search])

    if (isLoading) {
      return (
        <div className='flex justify-center items-center w-full h-[400px]'>
          <Spinner className="size-8" />
        </div>
      );
    }

  return (
    <>
      <div className="flex justify-between py-8 flex-wrap">
        {/* <div className="gap-3 flex md:w-auto w-full">
          <SelectInput />
          <SelectInput />
          <SelectInput />
        </div> */}

        <div className="md:w-auto w-full mt-4 md:mt-0 ml-auto">
          <InputGroup className="py-4.5 md:w-[250px] w-full">
            <InputGroupInput
              placeholder="Search..."
              onChange={handleSearch}
              value={search}
            />
            <InputGroupAddon>
              <CiSearch />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div className="cards_container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {!searchMode &&
          events &&
          events.map((event) => {
            return (
              <EventCard
                key={event.id}
                title={event.title}
                startDate={event.start_date}
                description={event.description}
                locationDetails={event.location_details}
                capacity={event.capacity}
                image={event.image}
                eventLink={event.event_link}
              />
            );
          })}
        {searchMode &&
          filteredEvents &&
          filteredEvents.map((event) => {
            return (
              <EventCard
                key={event.id}
                title={event.title}
                startDate={event.start_date}
                description={event.description}
                locationDetails={event.location_details}
                capacity={event.capacity}
                image={event.image}
                eventLink={event.event_link}
              />
            );
          })}
      </div>
    </>
  );
}

export default EventsWrapper

