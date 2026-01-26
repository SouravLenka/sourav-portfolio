import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// Note: In a real environment, we might need to implement the shader logic manually if 'react-bits' isn't a direct dependency. 
// However, the prompt implies using "Silk settings". 
// Since "React Bits" is a collection of copy-paste components, I often need the underlying shader code.
// I will implement a custom shader material that mimics the "Silk" effect described.

// Providing a robust implementation using standard THREE.js shader logic compatible with R3F.

const SilkMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Float32Array([0.39, 0.4, 0.94]) }, // #6366f1
        uNoiseIntensity: { value: 1.6 },
        uSpeed: { value: 5.0 },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uNoiseIntensity;
    uniform float uSpeed;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      float noise = snoise(vUv * uNoiseIntensity + uTime * uSpeed * 0.1);
      float opacity = 0.5 + 0.5 * sin(noise * 3.0 + uTime);
      gl_FragColor = vec4(uColor * (0.8 + 0.2 * noise), opacity * 0.4); 
    }
  `
};

import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Extend R3F with a custom shader material if I were to use shaderMaterial from drei, 
// but for simplicity and robustness I'll use a mesh and simple material or standard logic.

// Actually, "React Bits" Silk is likely a specific implementation. 
// I will create a high-quality approximation that fits the "dark, smooth, atmospheric" requirement.

function SilkMesh({ color, speed, noiseIntensity }) {
    const mesh = useRef();
    const material = useRef();

    useFrame((state, delta) => {
        if (material.current) {
            material.current.uniforms.uTime.value += delta;
            // material.current.uniforms.uColor.value = new THREE.Color(color); // Update if prop changes
        }
    });

    return (
        <mesh ref={mesh} scale={[2, 2, 1]}>
            <planeGeometry args={[10, 10, 128, 128]} />
            <shaderMaterial
                ref={material}
                uniforms={{
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color(color) },
                    uNoiseIntensity: { value: noiseIntensity },
                    uSpeed: { value: speed }
                }}
                vertexShader={SilkMaterial.vertexShader}
                fragmentShader={SilkMaterial.fragmentShader}
                transparent={true}
            />
        </mesh>
    );
}

export default function SilkBackground({
    speed = 5,
    scale = 1.1,
    color = "#6366f1",
    noiseIntensity = 1.6
}) {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <SilkMesh
                    speed={speed}
                    scale={scale}
                    color={color}
                    noiseIntensity={noiseIntensity}
                />
            </Canvas>
        </div>
    );
}
