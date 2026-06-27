import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amaya Dental Clinic — Best Dental Clinic in Sadashiv Peth, Pune" },
      { name: "description", content: "Expert dental care in Sadashiv Peth, Pune. 4.9★ from 276 patients. Invisalign, implants, veneers, teeth whitening, and preventive care." },
      { property: "og:title", content: "Amaya Dental Clinic — Sadashiv Peth, Pune" },
      { property: "og:description", content: "Healthy teeth and gums start with the right habits. Visit Amaya Dental for advanced, painless, and personalized dental treatments." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/index.html");
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#0A1628",
      color: "#FFFFFF",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      gap: "1.5rem"
    }}>
      <style>{`
        @keyframes pulseTooth {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; filter: drop-shadow(0 0 15px rgba(109,211,255,0.6)); }
        }
        .pulse-logo {
          width: 64px;
          height: 64px;
          color: #6DD3FF;
          animation: pulseTooth 2s infinite ease-in-out;
        }
        .clinic-name {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.02em;
        }
        .clinic-name span {
          color: #6DD3FF;
        }
      `}</style>
      <svg className="pulse-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8.5 2 7.5 3.5 7.8 7.5C8 9.5 7 11 6 12C4.5 13.5 4 16.5 5 19C5.8 21 7.2 22 9 20C9.8 19 11 17.5 12 17.5C13 17.5 14.2 19 15 20C16.8 22 18.2 21 19 19C20 16.5 19.5 13.5 18 12C17 11 16 9.5 16.2 7.5C16.5 3.5 15.5 2 12 2Z" />
      </svg>
      <div className="clinic-name">Dr. Harshal's dental Clinic<span>.</span></div>
    </div>
  );
}
