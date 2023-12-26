'use client'

import React, { useEffect, useRef } from "react";
import Webcam from 'react-webcam';

const VideoComponent: React.FC = () => {
  const videoTest = useRef(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  // flip  right to left webcam component using videoRef
  useEffect(() => {
    if (videoTest.current){
      //@ts-ignore
      videoTest.current.video.style.transform = "scaleX(-1)";
    }
  })
  return (
    <div className="text-white bg-blue-400">
      <Webcam 
      ref={videoTest}
      audio={false}
      height={500}
      width={720}
      />
    </div>
  );
};

export default VideoComponent;