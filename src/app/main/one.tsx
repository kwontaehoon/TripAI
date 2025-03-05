import React from 'react'

const one = () => {
  return (
    <div role='taehoon' className='flex lg:h-[500px] h-[200px] lg:space-x-12 space-x-4 lg:mb-12 mb-4'>
        <div className='flex-1'></div>
        <div className='w-[600px] border rounded-xl shrink-1'></div>
        <div className='w-[300px] rounded-xl flex flex-col shrink-1'>
            <div className='lg:h-[200px] h-[100px] border lg:mb-12 mb-4 rounded-xl'></div>
            <div className='flex-1 border rounded-xl'></div>
        </div>
        <div className='flex-1'></div>
    </div>
  )
}

export default one