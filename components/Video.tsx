'use client'

import React, { useEffect, useRef } from "react";
import Webcam from 'react-webcam';

const VideoComponent: React.FC = () => {
  const videoTest = useRef(null);
  const [show, setShow] = React.useState(false);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  // flip  right to left webcam component using videoRef
  useEffect(() => {
    if (videoTest.current){
      // @ts-ignore
      videoTest.current.video.style.transform = "scaleX(-1)";
    }
  })
  return (
    <div className="text-white bg-blue-400 flex flex-col gap-5">
      {show && <Webcam
        audio={false}
        height={500}
        ref={videoTest}
        screenshotFormat="image/jpeg"
        width={700}
        />
      }
    <button onClick={()=>setShow(true)}>show</button>
    <button onClick={()=>setShow(false)}>hide</button>
    </div>
  );
};

export default VideoComponent;