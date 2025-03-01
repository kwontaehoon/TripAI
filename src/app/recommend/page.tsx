import React from 'react'

const page = () => {
  return (
    <div className='flex py-32'>
      <div className='flex-1'></div>
      <div className='w-[900px]'>
          <div className='mb-2'>AI 추천 코스</div>
          <div className='mb-5'>지역 선택</div>
          <div className='w-[900px] h-16 flex justify-center mb-12 bg-blue-50 rounded-xl'>
              <div className='flex-1 border p-3'>
                <div className='border h-full bg-slate-100 flex items-center p-2 relative'>
                <div className='absolute top-10 left-0 w-full'>
                    <div className='h-40 border bg-blue-200'></div>
                  </div>
                  <div className='border w-4 h-4 mr-2'></div>
                  <div>지역 검색</div>
                </div>
              </div>
              <div className='flex-1 border p-3'>
                <div className='border h-full bg-slate-100 flex items-center p-2 relative'>
                  <div className='absolute top-10 left-0 w-full'>
                    <div className='h-40 border bg-blue-200'></div>
                  </div>
                  <div className='border w-4 h-4 mr-2'></div>
                  <div>지역 검색</div>
                </div>
              </div>
              <div className='flex-1 border p-3'>
                <div className='border h-full bg-slate-100 flex items-center p-2'>
                  <div className='border w-4 h-4 mr-2'></div>
                  <div>지역 검색</div>
                </div>
              </div>
              <div className='flex-1 border p-3'>
                <div className='border h-full bg-slate-100 flex items-center p-2'>
                  <div className='border w-4 h-4 mr-2'></div>
                  <div>지역 검색</div>
                </div>
              </div>
          </div>
          <div className='mt-[200px] flex h-[200px]'>
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
          </div>
      </div>
      <div className='flex-1'></div>
    </div>
  )
}

export default page