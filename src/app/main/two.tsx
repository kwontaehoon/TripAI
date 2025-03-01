import React from 'react'
import Link from "next/link"

const two = () => {
  return (
    <div className='flex lg:space-x-12 space-x-4 lg:h-[200px] h-[100px]'>
        <div className='flex-1'></div>
        <div className='w-[450px] flex'>
          <Link href="./ai" className='border border-black flex-1 rounded-xl p-5 relative flex items-end'>
              <div className='absolute right-5 top-5 rounded-full bg-blue-200 lg:w-20 w-12 lg:h-20 h-12 w-h-center'></div>
              <div>텍스트</div>
          </Link>
        </div>
        <div className='w-[450px] flex'>
          <Link href="./recommend" className='border border-black flex-1 rounded-xl p-5 relative flex items-end'>
              <div className='absolute right-5 top-5 rounded-full bg-blue-200 lg:w-20 w-12 lg:h-20 h-12 w-h-center'></div>
              <div>텍스트</div>
          </Link>
        </div>
        <div className='flex-1'></div>
    </div>
  )
}

export default two