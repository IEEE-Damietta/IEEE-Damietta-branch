import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// animate.js
export function createCounterObserver() {
  const counters = new Set();

  function animateCounter(el) {
    const target = +el.dataset.target;
    let current = 0;

    const speed = Math.max(0.1, target / 100);

    function update() {
      current += speed;

      if (current < target) {
        el.innerText = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }
    }

    update();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        animateCounter(el);
        // observer.unobserve(el);
      });
    },
    {
      threshold: 0.5,
    },
  );

  return {
    observe(el) {
      observer.observe(el);
    },
  };
}

export async function initBubblesEffect() {
  await loadSlim(tsParticles);
  
  await tsParticles.load({
    id: "tsparticles",
    options: {
      background: {
        color: "#06141f", // لون البحر العميق
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
    },
  });
}