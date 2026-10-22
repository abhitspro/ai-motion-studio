import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile, Easing } from "remotion";

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  
  const { fps, durationInFrames } = useVideoConfig();

  const glowOpacity = interpolate(frame, [0, 30, 60, 90], [0, 0.8, 0.8, 0.3], {
    extrapolateRight: "clamp",
  });
  const centerScale = interpolate(frame, [0, 20, 50, 80], [0.85, 1.15, 1.15, 1.05], {
    extrapolateRight: "clamp",
  });
  const textFade = interpolate(frame, [0, 20, 40, 70, 90], [0, 1, 1, 0.8, 0], {
    extrapolateRight: "clamp",
  });
  const textScale = interpolate(frame, [0, 20, 40, 70, 90], [0.8, 1.05, 1.05, 1.02, 1], {
    extrapolateRight: "clamp",
  });
  const spiritOpacity = interpolate(frame, [0, 10, 25, 55, 75, 90], [0, 0.7, 0.9, 0.9, 0.7, 0], {
    extrapolateRight: "clamp",
  });
  const bottomGlowY = interpolate(frame, [0, 15, 45, 75, 90], [1.1, 1.0, 1.0, 1.02, 1.1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0b", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <Audio src={staticFile("audio/scene_3_audio.mp3")} />

      <AbsoluteFill
        style={{
          background: "radial-gradient(circle at center, #1a1a05 0%, #0f0f0f 40%, #050505 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% ${50 * bottomGlowY}%, rgba(255, 200, 100, ${glowOpacity}) 0%, rgba(255, 150, 50, ${glowOpacity * 0.6}) 35%, rgba(100, 50, 0, ${glowOpacity * 0.3}) 65%, transparent 100%)`,
          transform: `scale(${centerScale})`,
          transition: "none",
        }}
      />

      <div style={{ position: "absolute", width: "70%", height: "70%", justifyContent: "center", alignItems: "center", transform: `scale(${centerScale})` }}>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse at center, rgba(255, 255, 220, 0.35) 0%, rgba(255, 200, 100, 0.15) 25%, rgba(150, 100, 0, 0.05) 50%, transparent 80%)",
          filter: "blur(20px)",
        }} />

        <div style={{
          width: "140%",
          height: "140%",
          background: "conic-gradient(from 0deg, rgba(255, 215, 0, 0.08) 0deg, transparent 60deg, rgba(255, 165, 0, 0.1) 120deg, transparent 180deg, rgba(255, 215, 0, 0.08) 240deg, transparent 300deg, rgba(255, 165, 0, 0.1) 360deg)",
          filter: "blur(15px)",
          animation: "pulseGlow 4s ease-in-out infinite",
        }} />

        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle at 30% 30%, #ffffff, #fff8e1 30%, #ffd54f 60%, #ff8f00 90%, #e65100 100%)",
            borderRadius: "50%",
            boxShadow: "0 0 60px rgba(255, 215, 0, 0.9), 0 0 120px rgba(255, 165, 0, 0.6), 0 0 180px rgba(255, 100, 0, 0.4)",
            position: "relative",
            zIndex: 3,
          }}>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "150px",
              height: "150px",
              background: "radial-gradient(circle at 40% 40%, #ffffff 0%, #fff3cd 20%, #ffe082 40%, #ffca28 60%, #ff6f00 85%, #e64a19 100%)",
              borderRadius: "50%",
              boxShadow: "0 0 40px rgba(255, 224, 178, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.5)",
              zIndex: 4,
            }} />
          </div>

          <div style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "130px",
            height: "130px",
            background: "radial-gradient(circle at 50% 45%, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #bdbdbd 75%, #616161 100%)",
            borderRadius: "50%",
            boxShadow: "0 0 25px rgba(255, 255, 255, 0.6), inset 0 -10px 20px rgba(0, 0, 0, 0.3)",
            zIndex: 5,
          }} />

          <div style={{
            position: "absolute",
            top: "48%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40px",
            height: "40px",
            background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #b3e5fc 30%, #0288d1 60%, #01579b 100%)",
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(179, 229, 252, 0.8), 0 0 40px rgba(2, 136, 209, 0.5)",
            zIndex: 6,
          }} />

          <div style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "160px",
            height: "160px",
            background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(139, 69, 19, 0.15) 70%, rgba(139, 69, 19, 0.05) 100%)",
            borderRadius: "50%",
            filter: "blur(8px)",
            zIndex: 2,
          }} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "0%",
          right: "0%",
          height: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "2px",
          opacity: spiritOpacity,
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              width: `${14 + (i % 3) * 6}px`,
              height: `${40 + (i % 4) * 10}px`,
              background: "linear-gradient(to top, #3e2723 0%, #5d4037 50%, #8d6e63 100%)",
              borderRadius: "50% 50% 0 0",
              transform: `translateX(${(i - 5.5) * 28}px) scale(${0.6 + (i % 5) * 0.12})`,
              opacity: 0.5 + (i % 3) * 0.15,
              boxShadow: "0 -2px 8px rgba(255, 200, 100, 0.3)",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "0%",
          right: "0%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: textFade,
          transform: `scale(${textScale})`,
          zIndex: 10,
        }}
      >
        <h1 style={{
          color: "#fff8e1",
          fontSize: "34px",
          fontWeight: 700,
          textAlign: "center",
          textShadow: "0 0 20px rgba(255, 215, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.8)",
          padding: "20px 40px",
          background: "linear-gradient(180deg, rgba(255, 248, 225, 0.15) 0%, rgba(139, 69, 19, 0.1) 100%)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          backdropFilter: "blur(8px)",
        }}>
          Yamaraj fell at His feet. For even Death must bow to the One who transcends time itself.
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "0%",
          right: "0%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3px",
          opacity: spiritOpacity,
        }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={`top-${i}`}
            style={{
              width: `${10 + (i % 3) * 5}px`,
              height: `${30 + (i % 3) * 8}px`,
              background: "linear-gradient(to top, #4e342e 0%, #6d4c41 50%, #a1887f 100%)",
              borderRadius: "50% 50% 0 0",
              transform: `translateX(${(i - 4.5) * 32}px) translateY(${Math.sin(i) * 8}px)`,
              opacity: 0.4 + (i % 2) * 0.2,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </AbsoluteFill>
  );
};