import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const GeneratedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 30,
      mass: 0.8,
      stiffness: 200,
    },
  });

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0c" }}>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: opacity,
        }}
      >
        <h1
          style={{
            color: "#00f2fe",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
            transform: `scale(${scale})`,
            textShadow: "0 0 40px rgba(0, 242, 254, 0.8), 0 0 80px rgba(0, 242, 254, 0.4)",
            filter: `drop-shadow(0 0 20px rgba(0, 242, 254, 0.6))`,
          }}
        >
          PIPELINE AGENT
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};