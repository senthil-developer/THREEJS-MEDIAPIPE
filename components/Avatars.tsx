'use client'
import { Color, Euler, Matrix4 } from 'three';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

interface AvatarProps {
  url: string;
  blendshapes: any[];
  rotation: Euler;
}

export const Avatar: React.FC<AvatarProps> = ({ url, blendshapes, rotation }) => {
  const { scene } = useGLTF(url);
  const { nodes } = useGraph(scene);

  useFrame(() => {
    if (blendshapes.length > 0) {
      blendshapes.forEach(element => {
        // Your blendshape update logic here
      });

      nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
      nodes.Neck.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
      nodes.Spine2.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);
    }
  });

  return <primitive object={scene} position={[0, -1.75, 3]} />;
};
