import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import RobotModel from "./RobotModel";

export default function RobotHero() {
  const [waveCount, setWaveCount] = useState(0);

  const wave = () => {
    setWaveCount((count) => count + 1);
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "850px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          height: "440px",
          width: "100%",
          background:
            "linear-gradient(180deg, #f8fafc, #e2e8f0)",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Canvas
          camera={{
            position: [3, 2.4, 4],
            fov: 42,
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.4} />
          <directionalLight
            position={[4, 7, 5]}
            intensity={2.3}
          />

          <group position={[0, -0.6, 0]}>
            <RobotModel
              waveCount={waveCount}
              onWave={wave}
            />

            <ContactShadows
              position={[0, -0.05, 0]}
              opacity={0.3}
              scale={5}
              blur={2.5}
              far={3}
            />
          </group>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={0.3}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </div>

      <h2 style={{ marginTop: "20px" }}>
        Meet My Robot
      </h2>

      <p>
        An interactive mobile manipulator exploring
        human-robot collaboration.
      </p>

      <button
        type="button"
        onClick={wave}
        style={{
          padding: "12px 24px",
          borderRadius: "10px",
          border: "none",
          background: "#f59e0b",
          color: "#111827",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        👋 Say Hello
      </button>

      <p
        style={{
          fontSize: "13px",
          opacity: 0.6,
          marginTop: "12px",
        }}
      >
        Drag to rotate · Click the robot to interact
      </p>
    </section>
  );
}