"use client";
import MemberBox from "./MemberBox";
import { useState } from "react";

const Members = () => {
  const [openModalFor, setOpenModalFor] = useState(null);

  return (
    <section className="section relative" id="members">
      <div className="container">
        <div className="text-center mt-4 mb-16">
          <h1 className="section__header">Our Executive Committee</h1>
          <h5 className="section_description">
            Meet the team behind IEEE Damietta Student Branch
          </h5>
        </div>

        <div className="flex justify-center flex-wrap gap-4 relative">
          <MemberBox
            name="Adham Elnfarawy"
            role="Chairman"
            photo="photo_2026-03-12_05-00-13.jpg"
            delay={0}
            modal={openModalFor === "Adham Elnfarawy"}
            modalOnOpen={() => setOpenModalFor("Adham Elnfarawy")}
            modalOnClose={() => setOpenModalFor(null)}
            memberDetails={{
              name: "Adham Elnfarawy",
              role: "Chairman",
              facebook: "https://www.facebook.com/share/1BEdUTg7Pc/",
              instagram:
                "https://www.instagram.com/adham_rezk33?igsh=bTdxZmt2djNtNDg2",
              linkedin:
                "https://www.linkedin.com/in/adham-elnafarawy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            }}
          />

          <MemberBox
            name="Rovan Rashad"
            role="Vice Chair technical"
            photo="photo_2026-03-15_15-12-09.jpg"
            delay={0.15}
            modal={openModalFor === "Rovan Rashad"}
            modalOnOpen={() => setOpenModalFor("Rovan Rashad")}
            modalOnClose={() => setOpenModalFor(null)}
            memberDetails={{
              name: "Rovan Rashad",
              role: "Vice Chair",
              facebook:
                "https://www.facebook.com/share/1DLzURQ9sK/?mibextid=wwXIfr",
              instagram:
                "https://www.instagram.com/rovanayman_?igsh=aDd0enhsYnBrbzJt&utm_source=qr",
              linkedin:
                "https://www.linkedin.com/in/rovan-rashad-196b7231a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
            }}
          />

          <MemberBox
            name="Basmala Elkhawaga"
            role="Vice Chair Non-technical"
            photo="photo_2026-03-15_15-12-32.jpg"
            delay={0.3}
            modal={openModalFor === "Basmala Elkhawaga"}
            modalOnOpen={() => setOpenModalFor("Basmala Elkhawaga")}
            modalOnClose={() => setOpenModalFor(null)}
            memberDetails={{
              name: "Basmala Elkhawaga",
              role: "Vice Chair Non-technical",
              facebook:
                "https://www.facebook.com/share/1DT891zDJp/?mibextid=wwXIfr",
              instagram:
                "https://www.instagram.com/me_du_sa.11?igsh=OG55eHgxM2Ixdnc0&utm_source=qr",
              linkedin:
                "https://www.linkedin.com/in/basmala-khalid-76b2a9335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
            }}
          />

          <MemberBox
            name="Omar Zaky"
            role="Secretary"
            photo="photo_2026-03-15_15-13-44.jpg"
            delay={0.45}
            modal={openModalFor === "Omar Zaky"}
            modalOnOpen={() => setOpenModalFor("Omar Zaky")}
            modalOnClose={() => setOpenModalFor(null)}
            memberDetails={{
              name: "Omar Zaky",
              role: "Secretary",
              facebook: "https://www.facebook.com/omar.zaky.8039",
              instagram:
                "https://www.instagram.com/omar___zaky?igsh=MTQzZnc3dHJjM2JtMw==",
              linkedin:
                "https://www.linkedin.com/in/omar-zaky-072674221?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            }}
          />

          <MemberBox
            name="Youssef Abdelazeem"
            role="Treasurer"
            photo="photo_2026-03-15_15-13-38.jpg"
            delay={0.6}
            modal={openModalFor === "Youssef Abdelazeem"}
            modalOnOpen={() => setOpenModalFor("Youssef Abdelazeem")}
            modalOnClose={() => setOpenModalFor(null)}
            memberDetails={{
              name: "Youssef Abdelazeem",
              role: "Treasurer",
              facebook: "https://www.facebook.com/YoussefAbdelaziiim",
              instagram: "https://www.instagram.com/youssef._.abdelazim",
              linkedin: "https://linkedin.com/in/youssef-mohamed10",
            }}
          />

          <MemberBox
            name="Nada Elhoseny"
            role="Treasurer"
            photo="photo_2026-03-15_15-12-25.jpg"
            delay={0.75}
            modal={openModalFor === "Nada Elhoseny"}
            modalOnOpen={() => setOpenModalFor("Nada Elhoseny")}
            modalOnClose={() => setOpenModalFor(null)}
            memberDetails={{
              name: "Nada Elhoseny",
              role: "Treasurer",
              facebook:
                "https://www.facebook.com/profile.php?id=100025767703104",
              instagram:
                "https://www.instagram.com/nada_ahmed1412?igsh=YzljYTk1ODg3Zg==",
              linkedin:
                "https://www.linkedin.com/in/nada-elhoseny-8741a634b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
            }}
          />

          <MemberBox
            name="Ahmed Eldeeb"
            role="Webmaster"
            photo="photo_2026-03-12_02-14-19.jpg"
            delay={0.9}
            modal={openModalFor === "Ahmed Eldeeb"}
            modalOnOpen={() => setOpenModalFor("Ahmed Eldeeb")}
            modalOnClose={() => setOpenModalFor(null)}
            memberDetails={{
              name: "Ahmed Eldeeb",
              role: "Webmaster",
              facebook:
                "https://www.facebook.com/share/1bxSnFahJS/?mibextid=wwXIfr",
              instagram:
                "https://www.instagram.com/eldeeb_9?igsh=dWxlYWNnM3hzdHU2&utm_source=qr",
              linkedin: "https://www.linkedin.com/in/ahmed-eldeeb-696983370",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Members;
