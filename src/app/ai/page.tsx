'use client'
import AiInput from '@/app/modal/ai-input'
import React, { useState } from 'react'
import { aiInputAtom } from '@/store/ai'
import { useAtom } from 'jotai'


const page = () => {

  const [aiInput, setAiInput] = useAtom(aiInputAtom);

  return (
    <div className='flex py-32 justify-center'>
      <div className='w-[900px]'>
          <div className='mb-2'>AI 추천 코스</div>
          <div className='mb-5'>지역 선택</div>
          <div className='w-full h-20 flex justify-center mb-12'>
              <div className='bg-blue-50 flex-1 mx-12 rounded-xl'></div>
          </div>
          <div className="flex justify-between flex-wrap gap-5">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="cursor-pointer border w-[250px] h-[250px] rounded-xl" onClick={()=>setAiInput(true)}></div>
            ))}
          </div>
      </div>

      {/* {showModal && createPortal(
        <AiInput onClose={() => setShowModal(false)} />,
        document.body
      )} */}

    </div>
  )
}

export default page