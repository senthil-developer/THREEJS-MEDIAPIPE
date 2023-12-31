import Link from 'next/link'

export default function HomePage() {
  return (
    <div className=''>
      <Link href='/video' className='border px-2 rounded-lg shadow-sm'>Video</Link>
    </div>
  )
}
