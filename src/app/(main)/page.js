import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Header from "./components/Header";
import Members from "./components/Members";
import Vision from "./components/Vision";
import Partners from "./components/Partners";
import Achievments from "./components/Achievments";
import Questions from "./components/Questions";

export const metadata = {
  title: "Home",
  description:
    "IEEE Damietta Student Branch official website. Discover workshops, events, member benefits, partners, achievements, and join our technical community.",
  keywords: [
    "IEEE Damietta",
    "University of Damietta",
    "technical community",
    "student branch",
    "engineering events",
    "workshops",
  ],
  alternates: {
    canonical: "https://ieeedamietta.org/",
  },
  openGraph: {
    title: "IEEE Damietta | Home",
    description:
      "Welcome to the official IEEE Damietta Student Branch site. Explore events, workshops, membership and technical community programs.",
    url: "https://ieeedamietta.org/",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "IEEE Damietta Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Damietta | Home",
    description:
      "Explore IEEE Damietta's official homepage and join our engineering student community.",
    images: ["/images/logo.jpg"],
  },
};

const Hello = () => {
  return (
    <>
      <Nav />
      <Header />
      <Members />
      <Vision />
      <Partners />
      <Achievments />
      <Questions />
      <Footer />
    </>
  );
};

export default Hello;
