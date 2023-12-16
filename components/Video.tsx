'use client'

import React, { useEffect, useRef } from 'react';

const Video: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        // Access the user's camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Get the video element using the useRef hook
        const video = videoRef.current;

        // Set the video stream as the source for the video element
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    // Check if the browser supports WebRTC
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? 
      startCamera()
   : console.error('WebRTC is not supported in this browser');
    
  }, []); // Empty dependency array ensures useEffect runs once when the component mounts

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay playsInline />
    </div>
  );
};

export default Video;
