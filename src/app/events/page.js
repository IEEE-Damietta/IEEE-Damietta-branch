import Nav from "../components/Nav";
import Footer from "../components/Footer";
import EventsPagination from "./components/Pagination";
import EventsWrapper from "./components/EventsWrapper";
export const metadata = {
  title: "Events",
  description:
    "Discover upcoming IEEE Damietta events. Register now for workshops, seminars, and technical competitions tailored for engineering students.",
  keywords: [
    "IEEE Damietta events",
    "technical events",
    "engineering workshops",
    "student workshops",
  ],
  alternates: {
    canonical: "https://ieeedamietta.org/events",
  },
  openGraph: {
    title: "IEEE Damietta | Events",
    description:
      "Discover upcoming IEEE Damietta events and register for engineering and technology activities.",
    url: "https://ieeedamietta.org/events",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "IEEE Damietta Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Damietta | Events",
    description:
      "Explore upcoming IEEE Damietta events, workshops, and technical activities for engineering students.",
    images: ["/images/logo.jpg"],
  },
};

const page = () => {
  return (
    <>
      <Nav />
      <section id="events" className="page-section">
        <div className="container">
          <EventsWrapper />

          <EventsPagination />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
