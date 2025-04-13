import React from 'react'
import Link from "next/link"

const page = () => {
  return (
    <div className='flex py-32'>
      <div className='flex-1'></div>
      <div className='w-[900px]'>
          <div className='mb-2'>AI 추천 코스</div>
          <div className='mb-5'>지역 선택</div>
          <div className='w-[900px] p-5 bg-blue-50 rounded-xl'>
             <div className='flex-1 bg-white mb-5 h-16 rounded-xl'></div>
             <div className='flex h-16 mb-5'>
              <div className='flex-1 bg-white mr-5 rounded-xl'></div>
              <div className='w-[200px] bg-white rounded-xl'></div>
             </div>
             <div>예산</div>
          </div>
          <Link href='/recommend/details/123' className='mt-12 flex h-[150px]'>
            <div className='w-[220px] border w-h-center'>사진</div>
            <div className='flex-1 border flex justify-center p-5 flex-col'>
              <div>제목</div>
              <div>부제목</div>
              <div className='flex'>
                <div>닉네임</div>
                <div>날짜</div>
                <div className='flex-1 flex justify-end'>조회수 댓글</div>
              </div>
            </div>
          </Link>
          <Link href='/recommend/details/222' className='mt-4 flex h-[150px]'>
            <div className='w-[220px] border w-h-center'>사진</div>
            <div className='flex-1 border flex justify-center p-5 flex-col'>
              <div>제목</div>
              <div>부제목</div>
              <div className='flex'>
                <div>닉네임</div>
                <div>날짜</div>
                <div className='flex-1 flex justify-end'>조회수 댓글</div>
              </div>
            </div>
          </Link>
      </div>
      <div className='flex-1'></div>
    </div>
  )
}

export default page