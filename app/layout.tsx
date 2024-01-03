import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'threeJS | mediapipe',
  description: 'Explore the immersive world of real-time 3D avatars with our cutting-edge web application powered by React and Three.js. Witness the magic of facial landmark detection using MediaPipe tasks-vision, creating lifelike animations that respond to your expressions. Customize your experience by dropping GLB files or pasting avatar URLs, opening a portal to a new dimension of interactive 3D modeling and augmented reality on the web.',
  keywords :['React Three.js avatar','Facial landmark detection', '3D avatar modeling', 'MediaPipe tasks-vision integration', 'WebGL graphics rendering', 'Computer vision in React', 'Real-time facial animation', 'GLB model rendering', 'User interaction in 3D space', 'Web-based augmented reality (AR)', 'Dynamic 3D animation'],
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full`}>
        <header>
          <Navbar/>
        </header>
        <main>
        {children}
        </main>
        <footer>
          <Footer/>
        </footer>
        </body>
    </html>
  )
}
