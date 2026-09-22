"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const VERTEBRA_COUNT = 9;

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const heroHeight = window.innerHeight;
      setProgress(Math.min(1, Math.max(0, window.scrollY / (heroHeight * 0.9))));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    function onMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function Vertebrae() {
  const group = useRef<THREE.Group>(null);
  const scrollProgress = useScrollProgress();
  const pointer = usePointer();

  const vertebrae = useMemo(
    () =>
      Array.from({ length: VERTEBRA_COUNT }, (_, i) => {
        const t = i / (VERTEBRA_COUNT - 1);
        return { t, key: i };
      }),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;

    const targetTiltX = pointer.current.y * 0.15;
    const targetTiltY = pointer.current.x * 0.2 + scrollProgress * 0.6;
    group.current.rotation.x += (targetTiltX - group.current.rotation.x) * 0.04;
    group.current.rotation.z += (-pointer.current.x * 0.08 - group.current.rotation.z) * 0.04;

    // "Alinha" verticalmente conforme rola — cada vértebra reduz o desvio lateral
    group.current.children.forEach((child, i) => {
      const misalign = Math.sin(i * 1.3) * 0.55 * (1 - scrollProgress);
      child.position.x = misalign;
    });

    void targetTiltY;
  });

  return (
    <group ref={group}>
      {vertebrae.map(({ t, key }) => {
        const y = (t - 0.5) * 5.2;
        const scale = 0.42 + Math.sin(t * Math.PI) * 0.18;
        return (
          <mesh key={key} position={[0, y, 0]} rotation={[0, t * 2.4, 0]}>
            <icosahedronGeometry args={[scale, 0]} />
            <MeshTransmissionMaterial
              thickness={0.6}
              roughness={0.15}
              transmission={1}
              ior={1.2}
              chromaticAberration={0.02}
              color="#e3a548"
              distortion={0.1}
              temporalDistortion={0.05}
            />
          </mesh>
        );
      })}
      <Sparkles count={40} scale={[4, 6, 4]} size={2.5} speed={0.25} color="#e3a548" opacity={0.5} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#f7f3ea" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#0a1128" />
      <Vertebrae />
    </>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

/** Fallback estático — mesma ilustração de coluna usada nas Opções 1 e 2,
 * pra quando não há WebGL ou o usuário pediu menos movimento. */
function StaticSpineFallback() {
  return (
    <svg viewBox="0 0 200 320" className="mx-auto h-full max-h-[520px] w-auto" aria-hidden="true">
      <path
        d="M100 10 C 88 50, 114 74, 100 110 C 88 146, 114 170, 100 206 C 90 234, 110 246, 100 280 C 92 300, 108 308, 100 316"
        stroke="#e3a548"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      <g fill="#f2d9a8">
        {[20, 55, 90, 125, 160, 195, 230, 265, 300].map((cy, i) => (
          <circle key={i} cx={100 + (i % 2 === 0 ? -6 : 6)} cy={cy} r={i % 3 === 0 ? 8 : 6} />
        ))}
      </g>
    </svg>
  );
}

export function Spine3D() {
  const [ready, setReady] = useState<"loading" | "webgl" | "fallback">("loading");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReady(prefersReduced || !supportsWebGL() ? "fallback" : "webgl");
  }, []);

  if (ready === "loading") return <div className="h-full w-full" aria-hidden="true" />;
  if (ready === "fallback") return <StaticSpineFallback />;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
