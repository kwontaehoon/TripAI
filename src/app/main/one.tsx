import React from 'react'

const one = () => {
  return (
    <div className='flex h-[500px] space-x-12 mb-12'>
        <div className='flex-1'></div>
        <div className='w-[600px] border rounded-xl shrink-1'></div>
        <div className='w-[300px] rounded-xl flex flex-col shrink-1'>
            <div className='h-[200px] border mb-12 rounded-xl'></div>
            <div className='flex-1 border rounded-xl'></div>
        </div>
        <div className='flex-1'></div>
    </div>
  )
}

export default one