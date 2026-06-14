import './footer.css'
import { FaLinkedin, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900">
      <div className="container">
        <div className="footer-content">
          <div className="footer-location">
            <h3>Location</h3>
            <p>جامعة دمياط - مصر</p>
            <p>دمياط، مصر</p>
          </div>

          <div className="social-links">
            <a href="https://www.facebook.com/share/1E1xosorsF/?mibextid=wwXIfr">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/ieee_dsb?igsh=MThhZXk1amY1MTNudg==">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/ieee-dsb/">
              <FaLinkedin />
            </a>
            <a href="https://www.tiktok.com/@ieee_damietta?_r=1&_t=ZS-94Pl7jB3MQu">
              <FaTiktok />
            </a>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email : ieeedsb0@gmail.com</p>
            <p>Phone: +20 101 681 8073</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2022-2026 IEEE Damietta Student Branch</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
