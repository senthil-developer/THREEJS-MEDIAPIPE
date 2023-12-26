'use client'

import React, { useEffect, useRef } from "react";
import Webcam from 'react-webcam';

const VideoComponent: React.FC = () => {
  const video = useRef<Webcam>(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  return (
    <div className="m-6 bg-red-600">
      <Webcam 
      audio={false}
      height={720}
      width={1280}
      />
    </div>
  );
};

export default VideoComponent;