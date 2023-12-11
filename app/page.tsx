import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col gap-5 justify-center items-center'>
      <Link href='/test'>test</Link>
    </div>
  )
}
