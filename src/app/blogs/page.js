import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { CiPen } from "react-icons/ci";

export const metadata = { title: "Blogs" };

const Hello = () => {
  return (
    <>
      <Nav />
      <section
        id="blogs"
        className="page-section blogs-coming-soon"
      >
        <div className="container">
          <div className="coming-soon-content">
            <h1 className="!text-white section__header">Blogs IEEE Damietta</h1>
            <p className="!text-white section_description">
              نحن نعمل حالياً على تجهيز محتوى تقني مميز يثري معرفتكم. انتظرونا
              قريباً بمقالات في مختلف المجالات الهندسيّة والتقنيّة!
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
