import React, { useEffect, useRef } from 'react';

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const accessCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    // Check for browser support
    //@ts-ignore
    if (navigator.mediaDevices.getUserMedia && navigator.mediaDevices ){
      accessCamera();
    } else {
      console.error('getUserMedia is not supported on this browser');
    }

    // Cleanup function to stop the stream when the component unmounts
    return () => { 
        //@ts-ignore
        const tracks = videoRef.current?.srcObject?.getTracks();
        //@ts-ignore
      tracks && tracks.forEach(track => track.stop());
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <video ref={videoRef} width="640" height="480" autoPlay playsInline muted></video>
  );
};

export default CameraComponent;