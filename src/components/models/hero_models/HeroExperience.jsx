import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense, useRef } from "react";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const screensRef = useRef();

  return (
    <Canvas camera={{ position: [0, 0, isMobile ? 12 : 15], fov: isMobile ? 40 : 45 }}>
      {/* deep blue ambient */}
      <ambientLight intensity={0.2} color="#1a1a40" />
      {/* Configure OrbitControls to disable panning and control zoom based on device type */}
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={!isTablet} // Disables zoom on tablets
        maxDistance={isMobile ? 15 : 20} // Maximum distance for zooming out
        minDistance={isMobile ? 3 : 5} // Minimum distance for zooming in
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <group
          scale={isMobile ? 0.85 : 1} // Increased scale for mobile
          position={[0, isMobile ? -1.8 : -3.5, 0]} // Moved up more on y-axis for mobile
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room screensRef={screensRef} />
        </group>
        
        {/* Move EffectComposer here where lights are defined */}
        <EffectComposer>
          <SelectiveBloom
            selection={screensRef}
            intensity={1.5} // Strength of the bloom
            luminanceThreshold={0.2} // Minimum luminance needed
            luminanceSmoothing={0.9} // Smooth transition
            blendFunction={BlendFunction.ADD} // How it blends
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
