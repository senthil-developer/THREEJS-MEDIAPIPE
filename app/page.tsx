import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full h-screen bg-slate-500 flex flex-col md:flex-row justify-center items-center gap-5'>
     <div className='w-64 bg-slate-800 '>
      <h1>threeJS | mediapipe</h1>
      <h2>A simple 3D web app using threeJS and mediapipe</h2>
      <h3>
        This is a simple web app that uses threeJS and mediapipe to
        render a 3D model of a person. The model is rendered using the
        webcam feed and the face mesh API.
      </h3>
     </div>
     <div className='flex w-full justify-evenly'>
      <video autoPlay playsInline muted loop className='w-40 rounded-xl'>
        <source src='/video/clip1.mp4' type='video/mp4'></source>
      </video>
      <video autoPlay playsInline muted loop className='w-40 rounded-xl'>
        <source src='/video/output.mp4' type='video/mp4'></source>
      </video>
     </div>
    </div>
  )
}
