'use client'
import { ai_boardResponse_func } from '@/common/ai/ai_response'
import Calendar from '@/components/calendar/Calendar'
import { useGeminiAiMutation } from '@/hooks/springboot/dev'
import { aiResponseAtom, modalUiStateAtom } from '@/store/ai'
import { transportationText } from '@/text'
import { cleanJson } from '@/util/cleanJson'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CloseSVG from '../../../public/svg/close.svg'

const AiInput = () => {

  const [modalUiState, setModalUiState] = useAtom(modalUiStateAtom)

  const [_, setAiResponse] = useAtom(aiResponseAtom)


  const [info] = useState({
      date: "2025년 4월 1일 ~ 2025년 4월 4일",
      transportation: "도보",
      budget: 5000
  });

  const { mutateAsync: geminiAimutation, data, isSuccess } = useGeminiAiMutation();

  const router = useRouter()

  useEffect(() => {

    if(isSuccess){
      setModalUiState({...modalUiState, aiInput: false})
      const cleanedJsonString = cleanJson(data.candidates[0].content.parts[0].text)
    try {
      const jsonData = JSON.parse(cleanedJsonString);
      setAiResponse(jsonData)
      localStorage.setItem("aiList", JSON.stringify(jsonData))
    } catch (error) {
      console.error("JSON 변환 실패:", error);
    }
      router.push('/aiList')
    }

    
  }, [data])

  return (
    <div className='modal flex flex-col p-5'>
        <div className='overflow-y-scroll scrollbar-hide'>
        <div className='flex lg:justify-start items-center justify-center fixed lg:relative w-full py-3 lg:py-0 bg-white'>
          <div>AI 추천 코스</div>
          <Image src={CloseSVG} alt="Close SVG" className='absolute left-0 lg:hidden block cursor' 
            onClick={() => setModalUiState({...modalUiState, aiInput: false})}
          />
        </div>
        <div className='lg:mt-4 mt-16'>기간 선택</div>
        <div className='my-5 flex justify-center'>
          <div className='w-[350px]'>
          <Calendar />
          </div>
        </div>
        <div>예산</div>
        <div className='bg-red-200 w-full h-4 rounded-xl my-3 relative'>
          <div className='absolute -top-2 left-[10%] shadow rounded-full w-8 h-8 bg-white'></div>
        </div>
        <div className='font-bold text-ms'>0원 ~ 500,000원 이상</div>

        <div className='mt-5'>교통 수단</div>
        <div className='flex flex-wrap gap-5 mt-5 mb-20'>
          {transportationText.map(x => (
            <div key={x.id} className="cursor shadow-md flex flex-col items-center justify-center w-[calc((100%-40px)/3)] h-[100px] rounded-xl">
              <div className='border w-8 h-8 mb-1'></div>
              <div>{x.name}</div>
            </div>
          ))}
        </div>

        {/* PC */}
        <div className='lg:flex hidden flex-1 items-end absolute bottom-0 w-full left-0 p-5 bg-white shadow'>
          <div className='flex w-full'>
            <div className='w-full h-12 w-h-center rounded-xl border mr-2 cursor' 
              onClick={() => setModalUiState({...modalUiState, aiInput: false})}>
                닫기
            </div>
            <div className='w-full h-12 w-h-center rounded-xl border ml-2 cursor' 
              onClick={async() => {
                await geminiAimutation(ai_boardResponse_func(info))
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

export default AiInput