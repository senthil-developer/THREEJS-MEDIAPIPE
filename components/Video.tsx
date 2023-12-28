'use client'

import { Canvas } from "@react-three/fiber";
import React, { useEffect} from "react";
import { Color, Euler, Matrix4 } from "three";
import Avatar from './Avatar'
import { useGLTF } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber";
import {FilesetResolver,FaceLandmarker } from "@mediapipe/tasks-vision";

let faceLandmarker : FaceLandmarker
let headMesh : any;
let lastVideoTime = -1;
let video : HTMLVideoElement;
let rotate: Euler;


const VideoComponent: React.FC = () => {
  const [show, setShow] = React.useState(false);

  const capture = async () => {
  //create async function
    const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm');
    faceLandmarker = await FaceLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate : 'GPU',
      },
      outputFaceBlendshapes : true,
      outputFacialTransformationMatrixes : true,
      runningMode: 'VIDEO'
    })

    video = document.getElementById('video') as HTMLVideoElement;
    navigator.mediaDevices.getUserMedia({ 
      video: {width : 1280 , height : 720}, 
      audio: false
    }).then((stream) => {
      video.srcObject = stream;
      video.addEventListener('loadeddata',predict)
    })
  }
    const predict = () => {
    let nowInMs = Date.now()
    if(lastVideoTime !== video.currentTime){
      lastVideoTime = video.currentTime;
      const result = faceLandmarker.detectForVideo(video,nowInMs) 
      if(result.facialTransformationMatrixes && result.facialTransformationMatrixes.length > 0){
      const matrix = new Matrix4().fromArray(result.facialTransformationMatrixes![0].data);
      rotate = new Euler().setFromRotationMatrix(matrix);
      console.log(rotate)
    }}
    requestAnimationFrame(predict)
  }
  useEffect(() => {
   capture();
  },[])
  
  
  return (
    <div className=" w-full h-full text-center flex flex-col items-center">
      <video autoPlay id='video' className="w-[450px] h-[300px]"/>
      <Canvas
      style={{
        width:'400px',
        height:'300px',
      }}  camera={{}}>
        <ambientLight intensity={0.5}/>
        <pointLight position={[1,1,1]} color={new Color(1,0,0)} intensity={0.5}/>
        <pointLight position={[-1,0,1]} color={new Color(0,1,0)} intensity={0.5}/>
        <Avatar rotate={rotate}/>
      </Canvas>  
    </div>    
  );
};  
export default VideoComponent;
