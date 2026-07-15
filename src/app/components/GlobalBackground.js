'use client';

import { usePathname } from "next/navigation";
import ParticleBackground from "./bubbles";

export default function GlobalBackground() {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  if (isDashboardRoute) {
    return null;
  }

  return (
    <>
      <ParticleBackground />
      <div className="ieee-bg-text">IEEE</div>
      <div className="blobs">
        <div className="blob-1" />
        <div className="blob-2" />
      </div>
    </>
  );
}
