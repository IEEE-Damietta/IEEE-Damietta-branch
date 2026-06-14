import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SelectInput from "./components/SelectInput"
import EventsPagination from "./components/Pagination";
import EventCard from "./components/EventCard";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { CiSearch } from "react-icons/ci";

export const metadata = { title: "Events" };

const page = () => {
  return (
    <>
      <Nav />
      <section id="events" className="page-section">
        <div className="container">
          <div className="flex justify-between py-8 flex-wrap">
            <div className="gap-3 flex md:w-auto w-full">
              <SelectInput />
              <SelectInput />
              <SelectInput />
            </div>

            <div className="md:w-auto w-full mt-4 md:mt-0">
              <InputGroup className="py-4.5 md:w-[250px] w-full">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <CiSearch />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          <div className="cards_container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <EventCard />
            <EventCard />
            <EventCard />
          </div>

          <EventsPagination />

        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
