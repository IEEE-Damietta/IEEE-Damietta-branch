import ProfilePageClient from "./components/profile-page-client";

export const metadata = {
  title: "Profile",
  description:
    "Personal profile page for IEEE Damietta members. View your registration details and branch activity.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const page = () => {
  return <ProfilePageClient />;
};

export default page;
