import "./globals.css";
import PageTransition from "./components/PageTransition";
import GlobalBackground from "./components/GlobalBackground";
import LoadingOverlay from "./components/LoadingOverlay";

// Convert HTML metadata tags into Next.js metadata format
export const metadata = {
  metadataBase: new URL("https://ieeedamietta.org"),
  title: {
    default: "IEEE Damietta Student Branch",
    template: "%s | IEEE Damietta",
  },
  applicationName: "IEEE Damietta Student Branch",
  description:
    "The official website of the IEEE Damietta University Branch. Explore workshops, register for events, track your tasks, and join the university's largest technical community.",
  keywords: [
    "IEEE",
    "IEEE Damietta",
    "Damietta University",
    "Computer Science",
    "Engineering",
    "Workshops",
    "Events",
    "Student Branch",
    "Technical Community",
  ],
  authors: [{ name: "IEEE Damietta Student Branch" }],
  publisher: "IEEE Damietta Student Branch",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://ieeedamietta.org/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    url: "https://ieeedamietta.org/",
    title: "IEEE Damietta Branch | Empowering Engineering Students",
    description:
      "Register for workshops, follow events, and join the IEEE technical community at Damietta University.",
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
    title: "IEEE Damietta Branch",
    description:
      "Join the IEEE Damietta technical community and register for workshops and events.",
    images: ["/images/logo.jpg"],
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-screen bg-slate-800 text-white">
          <LoadingOverlay />
          <PageTransition>{children}</PageTransition>
          <GlobalBackground />
      </body>
    </html>
  );
}
