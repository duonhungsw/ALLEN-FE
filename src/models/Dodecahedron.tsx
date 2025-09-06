import { useGLTF } from "@react-three/drei";
import { JSX } from "react";
import { forwardRef } from "react";
import * as THREE from "three";
import { Color, MeshStandardMaterial } from "three";

const DodecahedronModel = forwardRef<THREE.Group, JSX.IntrinsicElements["group"]>((props, ref) => {
  const { nodes }: any = useGLTF("/models/tools.glb");
  return (
    <group ref={ref} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dodecahedron.geometry}
        material={
          new MeshStandardMaterial({
            color: new Color(0x889fc6),
          })
        }
      />
    </group>
  );
});

DodecahedronModel.displayName = "DodecahedronModel";
export default DodecahedronModel;
