import { useEffect } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";

const ParticlesBackground = () => {
  useEffect(() => {
    loadSlim(tsParticles);
  }, []);

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: { value: "#0e0e0e" } },
        particles: {
          color: { value: "#ffffff" }, 
          links: {
            enable: true,
            color: "#ffffff",
            distance: 150,
            opacity: 0.6,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            outModes: { default: "bounce" },
          },
          number: {
            value: 100,
            density: { enable: true },
          },
          opacity: { value: 0.5 },
          size: { value: { min: 2, max: 5 } },
          shadow: {
            enable: true,
            color: "#ffffff",
            blur: 2,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
          modes: {
            repulse: { distance: 120 },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
