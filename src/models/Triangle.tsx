import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { Color, MeshStandardMaterial } from "three";
import * as THREE from "three";

const Triangle = forwardRef<THREE.Group, JSX.IntrinsicElements["group"]>((props, ref) => {
  const { nodes }: any = useGLTF("/models/tools.glb");
  
  return (
    <group ref={ref} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Triangle.geometry}
        material={
          new MeshStandardMaterial({
            color: new Color(0xd27b95),
          })
        }
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.428}
      />
    </group>
  );
});

Triangle.displayName = "Triangle";

export default Triangle;