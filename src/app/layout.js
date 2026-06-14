import "./globals.css";
import ParticleBackground from "./components/bubbles";
import PageTransition from "./components/PageTransition";

// تحويل الـ HTML tags إلى Next.js Metadata
export const metadata = {
  title: {
    default: "IEEE Damietta Student Branch",
    template: "%s | IEEE Damietta", // دي بتخلي العناوين الفرعية تظهر تلقائياً كدا: Events | IEEE Damietta
  },
  description:
    "الموقع الرسمي لـ IEEE فرع جامعة دمياط. استكشف الورش، سجل في الفعاليات، تابع تاسكاتك، وانضم لأكبر مجتمع تقني في الجامعة.",
  keywords: [
    "IEEE",
    "IEEE Damietta",
    "Damietta University",
    "Computer Science",
    "Engineering",
    "Workshops",
    "Events",
    "IEEE Egypt",
  ],
  authors: [{ name: "IEEE" }],
  manifest: "/site.webmanifest",

  // الـ Canonical Link
  alternates: {
    canonical: "https://ieeedamietta.org/",
  },

  // كود التحقق من جوجل (Google Site Verification)
  // verification: {
  //   google: "sfXaPh5_WrV57K0cfUxNzmVyFpqX8U3Ibn4ZNRq5uSM",
  // },

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    url: "https://ieeedamietta.org/",
    title: "IEEE Damietta Branch | Empowering Engineering Students",
    description:
      "سجل في ورش العمل، سلم تاسكاتك، وتابع درجاتك في مكان واحد. انضم لرحلة التعلم مع IEEE Damietta.",
    images: [
      {
        url: "/images/logo.jpg", // 💡 ملحوظة: شيلنا ./public لأن Next بيقرأ من public تلقائي
        width: 1200,
        height: 630,
        alt: "IEEE Damietta Logo",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image", // القيمة الصح هنا بتكون نوع الكارت مش مسار الصورة
    title: "IEEE Damietta Branch",
    description: "Join the largest technical community in Damietta University.",
    images: ["/images/logo.jpg"], // مسار الصورة مباشر من الـ public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="bg-slate-800 text-white">
        <PageTransition>{children}</PageTransition>
        <ParticleBackground />

        <div className="ieee-bg-text">IEEE</div>
        <div className="blobs">
          <div className="blob-1" />
          <div className="blob-2" />
        </div>
      </body>
    </html>
  );
}
