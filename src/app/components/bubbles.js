"use client";
import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    // Load the slim version of tsParticles for a smaller bundle
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // Optional: Do something when particles are fully loaded
    console.log(container);
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        className="fixed inset-0 -z-10 pointer-events-none text-[#0e212e]"
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: "#18212f",
          },
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: "#a8e6ff",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.1, max: 0.6 },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 15 },
            },
            move: {
              enable: true,
              speed: 1.2,
              direction: "top",
              random: false,
              straight: false,
              outModes: {
                default: "out",
              },
            },
          },
        }}
      />
    </ParticlesProvider>
  );
};

export default ParticleBackground;
