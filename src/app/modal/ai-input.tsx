import React from 'react'
import Image from 'next/image'
import { aiInputAtom } from '@/store/ai'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import CloseSVG from '../../../public/svg/close.svg'
import Calendar from '@/func/Calendar'
import { transportationText } from '@/text'

const aiInput = () => {

  const [aiInput, setAiInput] = useAtom(aiInputAtom)

  const router = useRouter()

  return (
    <div className='modal flex flex-col p-5'>
        <div className='overflow-y-scroll scrollbar-hide'>
        <div className='flex lg:justify-start items-center justify-center relative mb-2'>
          <div>AI 추천 코스</div>
          <Image src={CloseSVG} alt="Close SVG" className='absolute left-0 lg:hidden block cursor' onClick={() => setAiInput(false)}/>
        </div>
        <div className='mt-4'>기간 선택</div>
        <div className='my-5'>
          <Calendar />
        </div>
        <div>예산</div>
        <div className='bg-red-200 w-full h-4 rounded-xl my-3 relative'>
          <div className='absolute -top-2 left-[10%] shadow rounded-full w-8 h-8 bg-white'></div>
        </div>
        <div className='font-bold'>0원 ~ 500,000원 이상</div>

        <div className='mt-5'>교통 수단</div>
        <div className='flex flex-wrap gap-5 mt-5 mb-20'>
          {transportationText.map(x => (
            <div key={x.id} className="cursor flex flex-col items-center justify-center border w-[calc((100%-40px)/3)] h-[100px] rounded-xl">
              <div className='border w-8 h-8 mb-1'></div>
              <div>{x.name}</div>
            </div>
          ))}
        </div>

        {/* PC */}
        <div className='lg:flex hidden flex-1 items-end absolute bottom-0 w-full left-0 p-5 bg-white shadow'>
          <div className='flex w-full'>
            <div className='w-full h-12 w-h-center rounded-xl border mr-2 cursor' onClick={() => setAiInput(false)}>닫기</div>
            <div className='w-full h-12 w-h-center rounded-xl border ml-2 cursor' 
              onClick={() => {
                setAiInput(false)
                router.push('/aiList')
              }}
            >등록</div>
          </div>
        </div>
        {/* PC */}

        {/* Mobile */}


        {/* Mobile */}

        {/* <button onClick={onClose}>Close</button> */}
        </div>
    </div>
  )
}

export default aiInput