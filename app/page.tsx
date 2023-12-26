import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col gap-5 justify-center items-center bg-slate-500'>
      <Link href='/test' className='border px-2 rounded-lg shadow-sm'>Test</Link>
    </div>
  )
}
