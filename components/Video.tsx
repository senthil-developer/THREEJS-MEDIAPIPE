'use client'

import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import Webcam from 'react-webcam';
import { Color } from "three";
import Avatar from "./Avatar";
import {FilesetResolver,FaceLandmarker } from "@mediapipe/tasks-vision";

let faceLandmarker : FaceLandmarker
let lastVideoTime = -1;
let video : HTMLVideoElement;



const VideoComponent: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

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
    navigator.mediaDevices.getUserMedia(
      { 
        video: {width : 1280 , height : 720}, 
        audio: false
      }).then((stream) => {
        video.srcObject = stream;
        video.addEventListener('loadeddata',predict)
      })
    const predict = () => {
    const nowInMs = Date.now()
    if(lastVideoTime !== video.currentTime){
      lastVideoTime = video.currentTime;
      const result = faceLandmarker.detectForVideo(video,nowInMs) 
      console.log(result)
    }
    requestAnimationFrame(predict)
  }}
  useEffect(() => {
    if (video){
      // @ts-ignore
      video.style.transform = "scaleX(-1)";
    }
  })
  useEffect(() => {
   capture();
  },[])
  return (
    <div className="flex justify-center items-center h-full text-white bg-blue-400">
      <video autoPlay id='video'/>
      
    </div>
  );
};

export default VideoComponent;


// {show && 
//   <div className=" text-center flex flex-col">
//     <Webcam
//     className="border"
//     height={350}
//     ref={videoTest}
//     screenshotFormat="image/jpeg"
//     width={600} />
//     <Canvas className="bg-purple-600 h-[360px] w-[100vw]" camera={{}}>
//       <ambientLight intensity={0.5}/>
//       <pointLight position={[1,1,1]} color={new Color(1,0,0)} intensity={0.5}/>
//       <pointLight position={[-1,0,1]} color={new Color(0,1,0)} intensity={0.5}/>
//       <Avatar/>
//     </Canvas>
//     <button className='' onClick={()=>setShow(false)}>hide</button>
//   </div>
//   }
//    {!show && <button onClick={()=>setShow(true)}>show</button> }