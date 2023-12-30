'use client'


import { useEffect, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { Color, Euler, Matrix4 } from 'three';
import { Canvas } from '@react-three/fiber';
import { useDropzone } from 'react-dropzone';
import { setup } from "./setup";
import { predict } from "./predict";
import { Avatar } from "./Avatar";
import { options } from "./options";

function App() {
  let video: HTMLVideoElement;
  let faceLandmarker: FaceLandmarker;
  let lastVideoTime = -1;
  let blendshapes: any[] = [];
  let rotation: Euler;
  let headMesh: any[] = [];

  const [url, setUrl] = useState<string>("https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024");

  const { getRootProps } = useDropzone({
    onDrop: files => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  });

  const predictCallback = (newBlendshapes: any[], newRotation: Euler) => {
    blendshapes = newBlendshapes;
    rotation = newRotation;
  };

  useEffect(() => {
    setup(faceLandmarker, video, predictCallback);
  }, []);

  return (
    <div className="App">
      {/* ... (unchanged code) ... */}
      <Canvas style={{ height: 600 }} camera={{ fov: 25 }} shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color={new Color(1, 1, 0)} intensity={0.5} castShadow />
        <pointLight position={[-10, 0, 10]} color={new Color(1, 0, 0)} intensity={0.5} castShadow />
        <pointLight position={[0, 0, 10]} intensity={0.5} castShadow />
        <Avatar url={url} blendshapes={blendshapes} rotation={rotation} />
      </Canvas>
      {/* ... (unchanged code) ... */}
    </div>
  );
}

export default App;
