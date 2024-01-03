import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='home w-full h-screen flex flex-col md:flex-row items-center gap-12'>
     <div className="mt-6 flex  flex-col w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='flex flex-col relative w-[200px]  h-[100px] '>
          <Image className="rounded-t-lg " src="/image/image.jpg" alt="" width={400} height={300} style={{objectFit:'cover',width:'400px',height:'300px'}} />
        </div>
        <div className="">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Face Tracking</h1>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            A simple 3D web app using threeJS and mediapipe.
            This is a simple web app that uses threeJS and mediapipe to render a 3D model of a person. The model is rendered using the webcam feed and the face mesh API.
          </p>
     </div>

     </div>
     <div className='flex justify-evenly w-full '>
      <video autoPlay playsInline muted loop className='w-40 rounded-xl'>
        <source src='/video/output.mp4' type='video/mp4'></source>
      </video>
      <video autoPlay playsInline muted loop className='w-40 rounded-xl'>
        <source src='/video/output.mp4' type='video/mp4'></source>
      </video>
     </div>
    </div>
  )
}
