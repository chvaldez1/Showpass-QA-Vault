"use client";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Component, useEffect, useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";
import { Color, Matrix4, Vector3, type InstancedMesh } from "three";
import { locations } from "@/lib/workspace/city";
import { agentRoles, type AgentRole } from "@/lib/workspace/schema";
import { cityBlocks } from "./geometry";

type MapProps = {
  selected: AgentRole;
  onSelect: (role: AgentRole) => void;
  onUnavailable: () => void;
};

class CanvasBoundary extends Component<{
  children: ReactNode;
  onUnavailable: () => void;
}, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onUnavailable();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function CityGeometry() {
  const blocks = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = blocks.current;
    if (!mesh) return;

    const matrix = new Matrix4();
    const color = new Color();
    cityBlocks.forEach(({ position, size, color: blockColor }, index) => {
      matrix.makeScale(...size).setPosition(...position);
      mesh.setMatrixAt(index, matrix);
      mesh.setColorAt(index, color.set(blockColor));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, []);

  return (
    <instancedMesh ref={blocks} args={[undefined, undefined, cityBlocks.length]}>
      <boxGeometry />
      <meshStandardMaterial roughness={0.88} />
    </instancedMesh>
  );
}

function CityCamera() {
  const zoom = useThree(({ size }) => Math.min(size.width / 36, size.height / 24));

  return (
    <>
      <OrthographicCamera makeDefault position={[14, 20, 25]} zoom={zoom} near={0.1} far={120} />
      <OrbitControls
        enablePan={false}
        enableDamping={false}
        minZoom={zoom * 0.75}
        maxZoom={zoom * 1.7}
        minPolarAngle={0.35}
        maxPolarAngle={1.13}
      />
    </>
  );
}

function ContextRecovery({ onUnavailable }: Pick<MapProps, "onUnavailable">) {
  const canvas = useThree(({ gl }) => gl.domElement);

  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onUnavailable);
    return () => canvas.removeEventListener("webglcontextlost", onUnavailable);
  }, [canvas, onUnavailable]);

  return null;
}

function BuildingMarkers({ selected, onSelect }: Omit<MapProps, "onUnavailable">) {
  return agentRoles.map((role) => {
    const { position: [x, z], size: [width, height, depth], color } = locations[role];
    const active = selected === role;

    function selectBuilding(event: ThreeEvent<MouseEvent>) {
      event.stopPropagation();
      if (event.delta <= 4) onSelect(role);
    }

    return (
      <group key={role}>
        <mesh position={[x, 0.18, z]}>
          <boxGeometry args={[width + 0.8, 0.045, depth + 0.8]} />
          <meshBasicMaterial color={color} transparent opacity={active ? 0.78 : 0.24} />
        </mesh>
        <mesh position={[x, height / 2 + 0.27, z]} onClick={selectBuilding}>
          <boxGeometry args={[width + 0.28, height + 0.24, depth + 0.42]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </group>
    );
  });
}

const labelAnchors = agentRoles.map((role) => {
  const { position: [x, z], size: [, height] } = locations[role];
  return new Vector3(x, height + 1.45, z);
});

function ProjectLabels({ labels }: { labels: RefObject<HTMLDivElement | null> }) {
  const origin = useRef(new Vector3());

  useFrame(({ camera, size }) => {
    const layer = labels.current;
    if (!layer) return;

    camera.updateMatrixWorld();
    labelAnchors.forEach((anchor, index) => {
      const label = layer.children.item(index) as HTMLElement | null;
      if (!label) return;

      const point = origin.current.copy(anchor).project(camera);
      const left = ((point.x + 1) * size.width) / 2;
      const top = ((1 - point.y) * size.height) / 2;
      label.style.transform = `translate3d(${left}px, ${top}px, 0) translate(-50%, -50%)`;
      label.style.zIndex = String(Math.round((1 - point.z) * 100));
      label.style.visibility = Math.abs(point.z) <= 1 ? "visible" : "hidden";
    });
  });

  return null;
}

export default function Map3D({ selected, onSelect, onUnavailable }: MapProps) {
  const labels = useRef<HTMLDivElement>(null);

  return (
    <>
      <CanvasBoundary onUnavailable={onUnavailable}>
        <Canvas
          aria-label="3D city model"
          frameloop="demand"
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        >
          <CityCamera />
          <ContextRecovery onUnavailable={onUnavailable} />
          <hemisphereLight args={["#c4d4ff", "#645291", 1.55]} />
          <directionalLight position={[7, 13, 5]} intensity={2.2} color="#fff0e0" />
          <CityGeometry />
          <BuildingMarkers selected={selected} onSelect={onSelect} />
          <ProjectLabels labels={labels} />
        </Canvas>
      </CanvasBoundary>
      <div ref={labels} aria-hidden="true" className="pointer-events-none absolute inset-0">
        {agentRoles.map((role) => (
          <span key={role} className="city-model-label" data-active={selected === role}>
            <span style={{ backgroundColor: locations[role].color }} />
            {locations[role].name}
          </span>
        ))}
      </div>
    </>
  );
}
