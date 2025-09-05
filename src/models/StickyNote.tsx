import { useGLTF } from "@react-three/drei";
import { JSX } from "react";
type GroupProps = JSX.IntrinsicElements["group"];
import { Color, MeshStandardMaterial } from "three";

function StickyNote(props: JSX.IntrinsicElements["group"]) {
  const { nodes }: any = useGLTF("/models/tools.glb");
  return (
    <group {...props}>
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
            color: new Color(0xee4c36a),
          })
        }
        position={[-8.433, 4.705, 3.086]}
        scale={1.522}
      />
    </group>
  );
}

export default StickyNote;
