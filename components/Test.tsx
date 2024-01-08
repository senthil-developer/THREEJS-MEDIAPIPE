'use client'

import { useEffect, useState } from 'react';
import { FaceLandmarker, FaceLandmarkerOptions, FilesetResolver } from "@mediapipe/tasks-vision";
import { Color, Euler, Matrix4 } from 'three';
import { Canvas, useFrame, useGraph } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useDropzone } from 'react-dropzone';
import { options } from './Options';
import Avatar from './Avatar'

export let video: HTMLVideoElement;
export let faceLandmarker: FaceLandmarker;
export let lastVideoTime = -1;
export let blendshapes: any[] = [];
export let rotation: Euler;
export let headMesh: any[] = [];


const option = options as FaceLandmarkerOptions;  

function App() {
  const [url, setUrl] = useState<string>("https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024");
  const { getRootProps } = useDropzone({
    onDrop: files => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result as string);
      }
      reader.readAsDataURL(file);
    }
  });

  const setup = async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, option);

    video = document.getElementById("video") as HTMLVideoElement;
navigator.mediaDevices.getUserMedia({

video: { width: 1280, height: 720 },

audio: false,

}).then(function (stream) {

video.style.transform = "scaleX(-1)"

video.srcObject = stream;

if(video.style.transform ===

'scaleX(-1)') {

video.addEventListener("loadeddata",

predict);
}
}
}
  const predict = async () => {
    let nowInMs = Date.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      const faceLandmarkerResult = faceLandmarker.detectForVideo(video, nowInMs);

      if (faceLandmarkerResult.faceBlendshapes && faceLandmarkerResult.faceBlendshapes.length > 0 && faceLandmarkerResult.faceBlendshapes[0].categories) {
        blendshapes = faceLandmarkerResult.faceBlendshapes[0].categories;

        const matrix = new Matrix4().fromArray(faceLandmarkerResult.facialTransformationMatrixes![0].data);
        rotation = new Euler().setFromRotationMatrix(matrix);
      }
    }

    window.requestAnimationFrame(predict);
  }

  const handleOnChange = (event: any) => {
    setUrl(`${event.target.value}?morphTargets=ARKit&textureAtlas=1024`);
  }

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="App w-full md:w-[500px]">
      <div {...getRootProps({ className: 'dropzone w-full md:w-[436px] mx-1' })}>
        <p>Drag & drop RPM avatar GLB file here</p>
      </div>
      <input className='url w-full md:w-[436px] mx-1' type="text" placeholder="Paste RPM avatar URL" onChange={handleOnChange} />
      <video className='camera-feed w-full mx-1 md:w-[468px]' id="video" autoPlay></video>
      <Canvas style={{ height: 600 }} camera={{ fov: 25 }} shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color={new Color(1, 1, 0)} intensity={0.5} castShadow />
        <pointLight position={[-10, 0, 10]} color={new Color(1, 0, 0)} intensity={0.5} castShadow />
        <pointLight position={[0, 0, 10]} intensity={0.5} castShadow />
        <Avatar url={url} />
      </Canvas>
    </div>
  );
}

export default App;