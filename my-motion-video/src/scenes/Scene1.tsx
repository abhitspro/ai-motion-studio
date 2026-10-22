import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile, Easing } from "remotion";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  
  const { fps, durationInFrames } = useVideoConfig();

  const skyOpacity = interpolate(frame, [0, 60, durationInFrames], [0.9, 0.6, 0.9], { extrapolateRight: "clamp" });
  const mountainScale = interpolate(frame, [0, durationInFrames], [0.95, 1], { extrapolateRight: "clamp" });
  const treeSway = Math.sin(frame / 15) * 0.03;
  const auraScale = interpolate(frame, [0, 60, durationInFrames], [0.8, 1.2, 1], { extrapolateRight: "clamp" });
  const auraOpacity = interpolate(frame, [0, 60, durationInFrames], [0.4, 0.9, 0.4], { extrapolateRight: "clamp" });
  const glowScale = interpolate(frame, [0, durationInFrames], [0.9, 1.1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0b", justifyContent: "center", alignItems: "center" }}>
      <Audio src={staticFile("audio/scene_1_audio.mp3")} />
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(${110 + treeSway}deg, #1a1a3a 0%, #0d0d1f 45%, #050510 100%)`,
        opacity: skyOpacity,
        transition: "background 0.5s ease",
      }} />
      <div style={{ position: "absolute", bottom: "15%", left: "50%", transform: "translateX(-50%) scale3d(1,1,1)" }}>
        <svg width="800" height="400" viewBox="0 0 800 400" style={{ filter: "drop-shadow(0 0 30px rgba(255,215,0,0.3))" }}>
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a2a5a" />
              <stop offset="50%" stopColor="#151535" />
              <stop offset="100%" stopColor="#0a0a1f" />
            </linearGradient>
            <linearGradient id="snowCap" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d9d9f0" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 L150,200 L250,320 L350,150 L450,300 L550,180 L650,320 L800,200 L800,400 Z"
            fill="url(#mountainGradient)"
          />
          <path
            d="M350,150 L380,200 L420,160 L460,220 L500,180 L550,180"
            fill="none"
            stroke="url(#snowCap)"
            strokeWidth="4"
          />
        </svg>
      </div>
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%) scale3d(1,1,1)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(255,165,0,0.05) 40%, transparent 70%)",
        filter: "blur(40px)",
        transform: `translate(-50%, -50%) scale(${glowScale})`,
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "35%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        pointerEvents: "none",
      }}>
        {[-1, -0.5, 0.5, 1].map((offset, i) => (
          <div
            key={i}
            style={{
              width: "120px",
              height: "220px",
              background: "linear-gradient(to top, #050510 0%, #1a1a3a 100%)",
              transform: `translateX(${offset * 20}px) translateY(${Math.sin(frame / 12 + i) * 5}px)`,
              clipPath: "polygon(20% 100%, 0 60%, 30% 40%, 10% 10%, 50% 0, 90% 15%, 70% 45%, 100% 60%, 80% 100%)",
              opacity: 0.85,
            }}
          />
        ))}
      </div>
      <div style={{
        position: "absolute",
        right: "-10%",
        bottom: "10%",
        width: "300px",
        height: "450px",
        background: `radial-gradient(circle at 30% 50%, rgba(220,20,60,${auraOpacity}) 0%, rgba(139,0,0,0.8) 40%, transparent 70%)`,
        filter: "blur(20px)",
        transform: `scale(${auraScale})`,
        opacity: 0.9,
      }} />
      <div style={{
        position: "absolute",
        right: "5%",
        bottom: "8%",
        width: "200px",
        height: "380px",
        background: "#050510",
        clipPath: "polygon(25% 100%, 10% 55%, 40% 50%, 20% 10%, 55% 0, 90% 15%, 65% 50%, 100% 55%, 70% 100%)",
        filter: "drop-shadow(0 0 15px rgba(139,0,0,0.6))",
        transform: `scale(${auraScale * 0.7})`,
      }} />
      <div style={{
        position: "absolute",
        top: "20%",
        left: "15%",
        width: "100px",
        height: "180px",
        background: "linear-gradient(to top, #050510 0%, #1a1a3a 100%)",
        transform: `translateX(${treeSway * 50}px)`,
        clipPath: "polygon(30% 100%, 0 50%, 35% 30%, 10% 0%, 55% 20%, 75% 40%, 50% 60%, 100% 50%, 60% 100%)",
        opacity: 0.8,
      }} />
      <h1 style={{
        position: "absolute",
        top: "12%",
        textAlign: "center",
        color: "white",
        fontSize: "28px",
        fontFamily: "Georgia, serif",
        textShadow: "0 0 20px rgba(255,215,0,0.8), 0 2px 10px rgba(0,0,0,0.8)",
        maxWidth: "90%",
        opacity: interpolate(frame, [0, 30, durationInFrames - 30, durationInFrames], [0, 1, 1, 0], { extrapolateRight: "clamp" }),
      }}>
        In the hallowed halls of Kailash, where silence bows to divinity, a shadow dares to enter.
      </h1>
    </AbsoluteFill>
  );
};