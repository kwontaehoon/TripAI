import React from 'react'

const page = () => {
  return (
    <header className='w-full h-16 bg-green-500 flex'>
        <div className='w-32 bg-red-500'></div>
        <div className='flex-1 border border-black flex flex-row-reverse'>
            {Array(6).fill(0).map((_, index) => (
                <div key={index} className='w-36 border border-black w-h-center'>
                    123
                </div>
            ))}
        </div>
    </header>
  )
}

export default page