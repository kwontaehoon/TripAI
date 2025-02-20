import React from 'react'
import { aiInputAtom } from '@/store/ai'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

const aiInput = () => {

  const [aiInput, setAiInput] = useAtom(aiInputAtom)

  const router = useRouter()

  return (
    <div className='modal flex flex-col p-5'>
        <div>AI 추천 코스</div>
        <div className='border-b'>필드 입력</div>

        <div>기간 선택</div>
        <div className='bg-red-200 w-full h-12 rounded-xl my-5'></div>
        <div>예산</div>
        <div className='bg-red-200 w-full h-12 rounded-xl my-5'></div>
        <div>교통 수단</div>
        <div className='flex flex-wrap gap-5 justify-between my-5'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="cursor-pointer border w-[205px] h-[80px] rounded-xl"></div>
          ))}
        </div>

        <div className='flex justify-end'>
          <div>상세 설정</div>
        </div>

        <div className='flex flex-1 items-end'>
          <div className='flex w-full'>
            <div className='w-full h-12 w-h-center rounded-xl border mr-2 cursor-pointer' onClick={() => setAiInput(false)}>닫기</div>
            <div className='w-full h-12 w-h-center rounded-xl border ml-2 cursor-pointer' 
              onClick={() => {
                setAiInput(false)
                router.push('/aiList')
              }}
            >등록</div>
          </div>
        </div>

        {/* <button onClick={onClose}>Close</button> */}
    </div>
  )
}

export default aiInput