import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Part({ position, args, color, ...props }) {
  return (
    <mesh position={position} {...props}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.45} />
    </mesh>
  );
}

function ArmLink({
  position,
  length,
  radius = 0.11,
  color = "#f8fafc",
}) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry
        args={[radius * 0.85, radius, length, 32]}
      />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.35}
      />
    </mesh>
  );
}

function Joint({ position, radius = 0.13 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 24, 16]} />
      <meshStandardMaterial
        color="#f59e0b"
        metalness={0.3}
        roughness={0.35}
      />
    </mesh>
  );
}

export default function RobotModel({ waveCount = 0, onWave }) {
  const shoulder = useRef();
  const elbow = useRef();
  const wrist = useRef();
  const sensor = useRef();

  const lastWave = useRef(waveCount);
  const waveStart = useRef(-100);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (lastWave.current !== waveCount) {
      lastWave.current = waveCount;
      waveStart.current = time;
    }

    const waving = time - waveStart.current < 2.5;
    const pointerX = THREE.MathUtils.clamp(
      state.pointer.x,
      -1,
      1
    );

    if (shoulder.current) {
      const target = waving
        ? -0.55
        : 0.25 + Math.sin(time * 0.8) * 0.08;

      shoulder.current.rotation.z = THREE.MathUtils.damp(
        shoulder.current.rotation.z,
        target,
        5,
        delta
      );

      shoulder.current.rotation.y = THREE.MathUtils.damp(
        shoulder.current.rotation.y,
        pointerX * 0.25,
        3,
        delta
      );
    }

    if (elbow.current) {
      const target = waving
        ? -0.9 + Math.sin(time * 9) * 0.3
        : -0.65 + Math.sin(time * 0.6) * 0.06;

      elbow.current.rotation.z = THREE.MathUtils.damp(
        elbow.current.rotation.z,
        target,
        7,
        delta
      );
    }

    if (wrist.current) {
      const target = waving
        ? Math.sin(time * 11) * 0.35
        : 0;

      wrist.current.rotation.x = THREE.MathUtils.damp(
        wrist.current.rotation.x,
        target,
        8,
        delta
      );
    }

    if (sensor.current) {
      sensor.current.rotation.y = THREE.MathUtils.damp(
        sensor.current.rotation.y,
        pointerX * 0.6,
        4,
        delta
      );
    }
  });

  return (
    <group onClick={(event) => {
      event.stopPropagation();
      onWave?.();
    }}>
      {/* Mobile base */}
      <Part
        position={[0, 0.28, 0]}
        args={[1.4, 0.35, 0.9]}
        color="#e2e8f0"
      />

      {/* Four wheels */}
      {[-0.7, 0.7].map((x) =>
        [-0.32, 0.32].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x, 0.2, z]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.2, 0.2, 0.12, 24]} />
            <meshStandardMaterial 
              color="#334155"
              roughness={0.85}/>
          </mesh>
        ))
      )}

      {/* Main body */}
      <Part
        position={[0, 0.65, 0]}
        args={[0.8, 0.55, 0.65]}
        color="#f8fafc"
      />

      {/* Camera / sensor head */}
      <group ref={sensor} position={[0.25, 1.05, 0]}>
        <Part
          position={[0, 0.05, 0]}
          args={[0.38, 0.24, 0.3]}
          color="#334155"
        />
        <mesh position={[0, 0.06, 0.16]}>
          <sphereGeometry args={[0.07, 20, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Articulated robot arm */}
      <group position={[-0.22, 0.98, 0]}>
        <Joint position={[0, 0, 0]} radius={0.18} />

        <group ref={shoulder}>
          <ArmLink
            position={[0, 0.38, 0]}
            length={0.76}
            radius ={0.14}
          />

          <group position={[0, 0.76, 0]} ref={elbow}>
            <Joint position={[0, 0, 0]} />

            <ArmLink
              position={[0, 0.32, 0]}
              length={0.64}
              radius={0.11}
              color="#e2e8f0"
            />

            <group position={[0, 0.64, 0]} ref={wrist}>
              <Joint position={[0, 0, 0]} radius={0.1} />

              <Part
                position={[0, 0.14, 0]}
                args={[0.3, 0.22, 0.2]}
                color="#f59e0b"
              />

              {/* Two-finger gripper */}
              <Part
                position={[-0.12, 0.36, 0]}
                args={[0.065, 0.28, 0.1]}
                color="#334155"
              />
              <Part
                position={[0.12, 0.36, 0]}
                args={[0.065, 0.28, 0.1]}
                color="#334155"
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}