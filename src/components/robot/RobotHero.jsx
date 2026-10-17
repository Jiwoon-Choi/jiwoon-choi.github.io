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
    <div className="robot-hero">
      <div className="robot-canvas">
        <Canvas
          camera={{
            position: [3, 2.4, 4],
            fov: 52,
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.8} />

          <directionalLight
            position={[4, 7, 5]}
            intensity={2.2}
          />

          <directionalLight
            position={[-4, 3, -3]}
            intensity={0.7}
            color="#b9d9ff"
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
            enableZoom={true}
            enableDamping={true}
            dampingFactor={0.08}
            autoRotate={true}
            autoRotateSpeed={4.0}
            minDistance={2.5}
            maxDistance={9}
            target={[0, 0.35, 0]}
            minPolarAngle={0.3}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </div>

      <div className="robot-overlay">
        <span className="robot-hint">
          Drag to rotate · Scroll to zoom
        </span>

        <button
          type="button"
          className="robot-greet"
          onClick={wave}
        >
          👋 Say Hello
        </button>
      </div>
    </div>
  );
}