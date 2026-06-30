import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { CiPen } from "react-icons/ci";

export const metadata = {
  title: "Blogs",
  description:
    "IEEE Damietta blog is coming soon. Stay tuned for technical articles covering programming, networking, systems, and engineering opportunities.",
  keywords: [
    "IEEE Damietta blog",
    "technical articles",
    "engineering content",
    "student branch blog",
  ],
  alternates: {
    canonical: "https://ieeedamietta.org/blogs",
  },
  openGraph: {
    title: "IEEE Damietta | Blogs Coming Soon",
    description:
      "IEEE Damietta blog is coming soon. Follow us for useful technical content across engineering and computing.",
    url: "https://ieeedamietta.org/blogs",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "IEEE Damietta Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Damietta | Blogs Coming Soon",
    description:
      "Follow the IEEE Damietta blog soon for the latest technical and engineering articles.",
    images: ["/images/logo.jpg"],
  },
};

const Hello = () => {
  return (
    <>
      <Nav />
      <section id="blogs" className="page-section blogs-coming-soon">
        <div className="container">
          <div className="coming-soon-content">
            <h1 className="!text-white section__header">Blogs IEEE Damietta</h1>
            <p className="!text-white section_description">
              We are currently preparing high-quality technical content to
              enrich your knowledge. Stay tuned for upcoming articles across
              engineering and technology topics!
            </p>

            <div className="launch-progress bg-white">
              <div className="progress-bar"></div>
            </div>

            <div className="stay-tuned">
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hello;
