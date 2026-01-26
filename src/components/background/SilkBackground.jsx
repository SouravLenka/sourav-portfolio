import Silk from "../Silk";

export default function SilkBackground({
  speed = 5,
  scale = 1,
  color = "#6366f1",
  noiseIntensity = 1.5,
  rotation = 0,
}) {
  return (
    <div className="silk-wrapper">
      <Silk
        speed={speed}
        scale={scale}
        color={color}
        noiseIntensity={noiseIntensity}
        rotation={rotation}
      />
    </div>
  );
}
