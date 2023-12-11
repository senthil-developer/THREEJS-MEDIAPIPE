'use client'
import { useEffect } from 'react';

let video: HTMLVideoElement;

export default function Video() {
const handleOnChange = () => {
}

const setup = () => {

video = document.getElementById("video") as HTMLVideoElement;
navigator.mediaDevices.getUserMedia({
video: { width: 300, height: 200},
}).then((stream) => {
video.srcObject = stream;
})
}

useEffect (() => {
setup();
}, [])


return (

<div className="App">

<input type="text" placeholder='Enter your RPM avatar URL' onChange={handleOnChange} />

<video autoPlay id="video" />

</div>

);

}
