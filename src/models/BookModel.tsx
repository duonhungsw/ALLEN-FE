import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { Color, MeshStandardMaterial } from "three";
import * as THREE from "three";

const BookModel = forwardRef<THREE.Group, JSX.IntrinsicElements["group"]>((props, ref) => {
  const { nodes }: any = useGLTF("/models/tools.glb");
  
  return (
    <group ref={ref} {...props}>
      <group position={[0, 0, 0]} scale={[1.847, 3.361, 3.073]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle_12.geometry}
          material={
            new MeshStandardMaterial({
              color: new Color(0xe4c36a),
            })
          }
          position={[2.731, -60.024, -28.132]}
          rotation={[1.008, -1.426, -0.29]}
          scale={[0.161, 0.398, 0.659]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle.geometry}
          material={
            new MeshStandardMaterial({
              color: new Color(0xd7d8d9),
            })
          }
          position={[-22.698, 32.77, 1.793]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_4.geometry}
          material={
            new MeshStandardMaterial({
              color: new Color(0xd7d8d9),
            })
          }
          position={[-0.318, 0.865, 0.731]}
          rotation={[0.002, 0.001, 0]}
          scale={[0.994, 1.008, 0.998]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_4_1.geometry}
          material={
            new MeshStandardMaterial({
              color: new Color(0x9cb256),
            })
          }
          position={[-16.676, -0.273, 9.748]}
          rotation={[0.002, 0.001, 0]}
          scale={[0.994, 1.008, 0.998]}
        />
      </group>
    </group>
  );
});

BookModel.displayName = "BookModel";

export default BookModel;