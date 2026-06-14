"use client";

import "./questions.css";
import { FaAngleDown } from "react-icons/fa";
import { useRef } from "react";

const Questions = () => {
  const toggleQuestion = (e) => {
    console.log(e.target.tagName);
    if (e.target.className == "faq-question" || e.target.tagName === "SPAN" || e.target.tagName == "svg" || e.target.tagName == "path")
      e.target.closest(".faq-item").classList.toggle("active");
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="section__header text-center">
          Frequently asked questions
        </h1>
        <p className="section_description text-center">
          Answers to the most frequently asked questions
        </p>
        <div className="faq-container" onClick={toggleQuestion}>
          <div className="faq-item">
            <div className="faq-question">
              <span>What is IEEE?</span>
              <FaAngleDown />
            </div>
            <div className="faq-answer">
              <p>
                IEEE (Institute of Electrical and Electronics Engineers) is the
                world's largest technical professional organization, with more
                than 420,000 members across over 160 countries. Its mission is
                to advance technology for the benefit of humanity.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>How can I join the IEEE Damietta Student Branch?</span>
              <FaAngleDown />
            </div>
            <div className="faq-answer">
              <p>
                You can join by clicking the "Join Now" button on the homepage
                or navigation menu and completing the registration form.
                Membership is free for eligible students.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>Is membership free?</span>
              <FaAngleDown />
            </div>
            <div className="faq-answer">
              <p>
                Yes. Membership in the IEEE Damietta Student Branch is
                completely free for students. Members gain access to workshops,
                professional development opportunities, certificates, and
                training programs.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>What are the benefits of membership?</span>
              <FaAngleDown />
            </div>
            <div className="faq-answer">
              As a member, you can enjoy:
              <ul>
                <li>Free technical and professional workshops </li>
                <li>IEEE-recognized certificates of participation</li>
                <li>Internship and training opportunities</li>
                <li>Participation in competitions and events</li>
                <li>
                  Networking with students, professionals, and industry leaders
                </li>
                <li>Access to a supportive technical community</li>
              </ul>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>Can I participate in events without being a member?</span>
              <FaAngleDown />
            </div>
            <div className="faq-answer">
              <p>
                Yes. Most of our events are open to non-members. However,
                members receive priority registration and may enjoy additional
                exclusive benefits.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>What are the membership requirements?</span>
              <FaAngleDown />
            </div>
            <div className="faq-answer">
              <p>
                To become a member, you must be a student at the Faculty of
                Engineering, Damietta University, and complete the registration
                form. No additional requirements apply.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>How can I contact the branch?</span>
              <FaAngleDown />
            </div>
            <div className="faq-answer">
              <p>
                You can reach us through our official social media channels
                listed in the website footer or via the branch's official email
                address.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>Are workshops held regularly?</span>
              <FaAngleDown />
            </div>
            <div className="faq-answer">
              <p>
                Yes. We organize workshops and technical sessions throughout the
                year in various fields, including programming, robotics,
                artificial intelligence, electronics, and more. Follow our
                social media channels to stay updated on upcoming events and
                announcements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
