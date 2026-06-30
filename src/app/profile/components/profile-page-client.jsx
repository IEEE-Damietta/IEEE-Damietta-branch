"use client";

import { useCallback, useEffect, useState } from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { useAuth } from "@/app/hooks/AuthContext";
import { ProfileHeader } from "./profile-header";
import { ProfileDetails } from "./profile-details";
import { supabase } from "@/app/supabase";

export default function ProfilePageClient() {
  const { user, profile } = useAuth();
  const [profileData, setProfileData] = useState(profile);
  const userEmail = user?.email ?? "Unknown email";
  const fullName = profileData
    ? `${profileData.first_name ?? ""}`
    : (user?.email?.split("@")[0] ?? "IEEE Member");

  const refreshProfile = useCallback(async () => {
    if (!user?.id) return;

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfileData(data);
  }, [user?.id]);

  useEffect(() => {
    setProfileData(profile);
  }, [profile]);

  return (
    <>
      <Nav />

      <main className="px-3">
        <div className="container bg-slate-950 rounded-4xl mx-auto p-8! my-10!">
          <ProfileHeader fullName={fullName} email={userEmail} />
          <ProfileDetails
            profile={profileData}
            userEmail={userEmail}
            onProfileUpdated={refreshProfile}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
