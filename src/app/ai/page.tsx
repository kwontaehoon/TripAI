'use client'
import ModalContent from '@/modal/test'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'

const page = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className='flex justify-center'>
      <div className='py-28 max-w-[900px]'>
          <div className='mb-2'>AI 추천 코스</div>
          <div className='mb-5'>지역 선택</div>
          <div className='w-full h-20 flex justify-center mb-12'>
              <div className='bg-blue-50 flex-1 mx-12 rounded-xl'></div>
          </div>
          <div className="flex justify-between flex-wrap gap-5">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="cursor-pointer border w-[250px] h-[250px] rounded-xl" onClick={()=>setShowModal(true)}></div>
            ))}
          </div>
      </div>

      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}

    </div>
  )
}

export default page