import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { Color, MeshStandardMaterial } from "three";
import * as THREE from "three";

const RuleModel = forwardRef<THREE.Group, JSX.IntrinsicElements["group"]>(
  (props, ref) => {
    const { nodes }: any = useGLTF("/models/tools.glb");

    return (
      <group ref={ref} {...props}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rule.geometry}
          material={
            new MeshStandardMaterial({
              color: new Color(0x889fc6),
            })
          }
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1}
        />
      </group>
    );
  }
);

RuleModel.displayName = "RuleModel";

export default RuleModel;
