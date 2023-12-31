'use client'

import Link from 'next/link'
import React from 'react'

import { usePathname} from 'next/navigation'

const Navbar = () => { 
  const path = usePathname()
  return (
    <nav className='fixed top-0'>
        <h1 className='text-lg'>Face Tracking</h1>
        <Link href={'/video'} className={`${path == '/video' ? 'border-b border-yellow-400 text-red-600' : ''}`}>Videos</Link>
    </nav>
  )
}

export default Navbar