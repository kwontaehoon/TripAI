import React from 'react'
import Link from "next/link"

const two = () => {
  return (
    <div className='flex space-x-12 h-[250px]'>
        <Link href="./ai" className='border border-black flex-1 rounded-xl p-5 relative flex items-end'>
            <div className='absolute right-5 top-5 rounded-full bg-blue-200 w-20 h-20 w-h-center'></div>
            <div>텍스트</div>
        </Link>
        <Link href="./recommend" className='border border-black flex-1 rounded-xl p-5 relative flex items-end'>
            <div className='absolute right-5 top-5 rounded-full bg-blue-200 w-20 h-20 w-h-center'></div>
            <div>텍스트</div>
        </Link>
    </div>
  )
}

export default two