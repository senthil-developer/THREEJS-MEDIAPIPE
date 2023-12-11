'use client'
import { useEffect } from 'react';

let video: HTMLVideoElement;

export default function Video() {
const handleOnChange = () => {
}

const setup = () => {
video = document.getElementById("video") as HTMLVideoElement;
//@ts-ignore
navigator.getWebCam = (navigator.moxGetUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.getUserMedia)
 if(navigator.mediaDevices?.getUserMedia){
    navigator.mediaDevices?.getUserMedia({
video: { width: 300, height: 200}
}).then((mediaStream) => {
video.srcObject = mediaStream;
})
}
else{
    'shit'
}
}

useEffect (() => {
setup();
}, [])


return (

<div className="App">
    <input type="text" placeholder='Enter your RPM avatar URL' onChange={handleOnChange} />
    <video controls autoPlay id="video" className='md-hidden'/>
</div>

);

}