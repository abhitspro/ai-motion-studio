import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile, Easing } from "remotion";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  
  const { fps, durationInFrames } = useVideoConfig();

  const shivaGlow = interpolate(frame, [0, 30, 60], [0.8, 1.2, 0.8], {
    extrapolateRight: "clamp",
  });

  const thirdEyeLight = interpolate(frame, [0, 20, 40, 60], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const yamaFlames = interpolate(frame, [0, 30, 60], [0.7, 1.3, 0.7], {
    extrapolateRight: "clamp",
  });

  const radialGlow = interpolate(frame, [0, 15, 30, 45, 60], [0.9, 1.1, 1.3, 1.1, 0.9], {
    extrapolateRight: "clamp",
  });

  const particleOpacity = interpolate(frame, [0, 10, 20, 30, 40, 50, 60], [0, 0.6, 1, 0.8, 1, 0.6, 0], {
    extrapolateRight: "clamp",
  });

  const lightShift = interpolate(frame, [0, 30, 60], [1, 0.5, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0b", justifyContent: "center", alignItems: "center" }}>
      <Audio src={staticFile("audio/scene_2_audio.mp3")} />

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 50% 50%, rgba(255, 215, 0, ${0.3 * lightShift}), rgba(255, 69, 0, ${0.5 * lightShift}), rgba(139, 0, 0, ${0.7 * lightShift}) 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255, 255, 200, ${0.6 * radialGlow}), rgba(255, 215, 0, ${0.3 * radialGlow}) 40%, transparent 70%)`,
          transform: `scale(${shivaGlow})`,
          filter: "blur(20px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "35%",
          top: "30%",
          width: "140px",
          height: "220px",
          background: "linear-gradient(to bottom, #f5deb3, #8b4513)",
          borderRadius: "20px 20px 5px 5px",
          boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "25px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40px",
            height: "14px",
            background: `rgba(255, 255, 255, ${thirdEyeLight})`,
            borderRadius: "50%",
            boxShadow: `0 0 ${30 * thirdEyeLight}px rgba(255, 255, 255, ${thirdEyeLight})`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: "35%",
          top: "25%",
          width: "150px",
          height: "240px",
          background: `linear-gradient(to bottom, #8b0000, #4a0000)`,
          borderRadius: "25px 25px 8px 8px",
          transform: `scale(${yamaFlames})`,
          boxShadow: `0 0 ${50 * yamaFlames}px rgba(255, 69, 0, ${0.8 * yamaFlames})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "60px",
            background: "radial-gradient(circle, #ff4500, #8b0000)",
            borderRadius: "50%",
            boxShadow: "0 0 30px rgba(255, 69, 0, 0.9)",
          }}
        />
      </div>

      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${8 + (i % 3) * 4}px`,
            height: `${8 + (i % 3) * 4}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255, 215, 0, ${particleOpacity}), transparent 70%)`,
            left: `${10 + (i % 6) * 15}%`,
            top: `${20 + (Math.floor(i / 6)) * 40}%`,
            opacity: particleOpacity,
            animation: `float ${2 + (i % 4)}s ease-in-out infinite`,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "0%",
          width: "100%",
          height: "120px",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: "0",
              left: `${i * 12}%`,
              width: "30px",
              height: `${60 + (i % 4) * 40}px`,
              background: "linear-gradient(to top, rgba(255, 69, 0, 0.4), transparent)",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
        ))}
      </div>

      <h1 style={{ color: "white", zIndex: 10, textAlign: "center", padding: "20px" }}>
        But no force of death can touch the Eternal One without a battle of cosmic proportions.
      </h1>
    </AbsoluteFill>
  );
};