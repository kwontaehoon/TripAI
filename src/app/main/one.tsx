import React from 'react'

const one = () => {
  return (
    <div className='flex h-[750px] space-x-12 mb-12'>
        <div className='w-4/6 bg-blue-200 rounded-xl shrink-0'></div>
        <div className='flex-1 rounded-xl flex flex-col'>
            <div className='h-[200px] bg-yellow-200 mb-12 rounded-xl'></div>
            <div className='flex-1 bg-yellow-200 rounded-xl'></div>
        </div>
    </div>
  )
}

export default one