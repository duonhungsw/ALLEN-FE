import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { Color, MeshStandardMaterial } from "three";
import * as THREE from "three";

const StickyNote = forwardRef<THREE.Group, JSX.IntrinsicElements["group"]>((props, ref) => {
  const { nodes }: any = useGLTF("/models/tools.glb");
  
  return (
    <group ref={ref} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.paper.geometry}
        material={
          new MeshStandardMaterial({
            color: new Color(0xe4c36a),
          })
        }
        position={[-10.433, 9.852, 13.086]}
        scale={[1.522, 0.031, 1.522]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.body.geometry}
        material={
          new MeshStandardMaterial({
            color: new Color(0xe4c36a),  // ← Sửa lỗi typo: 0xee4c36a → 0xe4c36a
          })
        }
        position={[-8.433, 4.705, 3.086]}
        scale={1.522}
      />
    </group>
  );
});

StickyNote.displayName = "StickyNote";

export default StickyNote;