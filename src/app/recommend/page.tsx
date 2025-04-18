'use client'
import React, { useState, useRef } from 'react'
import Link from "next/link"
import { toggleOneFlag } from '@/util/toggle'
import Calendar from '@/func/Calendar'
import { useAtom } from 'jotai'
import { modalAbsoluteUiStateAtom } from '@/store/recommend'
import { useOutsideClick } from '@/hooks/useOutSideClick'

const page = () => {

  const refs = [useRef(null), useRef(null), useRef(null)];

  useOutsideClick(refs, () => {
    setBoxFlag(Array.from({length: 3}, () => false))
  });

  const [boxFlag, setBoxFlag] = useAtom(modalAbsoluteUiStateAtom)

  return (
    <div className='flex py-32'>
      <div className='flex-1'></div>
      <div className='w-[900px]'>
        <div className='mb-2'>AI 추천 코스</div>
        <div className='mb-5'>지역 선택</div>
        <div className='w-[900px] p-5 bg-blue-50 rounded-xl'>
          <div className={`flex-1 bg-white mb-5 h-16 cursor rounded-t-xl relative 
              ${boxFlag[0] ? 'rounded-b-none' : 'rounded-b-xl'}`}
            onClick={() => setBoxFlag(toggleOneFlag(boxFlag, 0))}>
            {boxFlag[0] && <div ref={refs[0]} className='absolute w-full h-40 bg-white border-t z-10 rounded-b-xl shadow-md top-16'
              onClick={(e) => {e.stopPropagation(); console.log("Aaa")}}>

            </div>}
          </div>
          <div className='flex h-16 mb-5'>
            <div className={`flex-1 bg-white mr-5 rounded-xl relative cursor border
                ${boxFlag[1] ? 'rounded-b-none' : 'rounded-b-xl'}`}
              onClick={() => setBoxFlag(toggleOneFlag(boxFlag, 1))}>
              {boxFlag[1] && <div ref={refs[1]} className='absolute w-full bg-white border-t z-10 rounded-b-xl shadow-md top-16'
                onClick={(e) => e.stopPropagation()}>
                <div className='w-[200px] border'><Calendar /></div>
                <div className='w-[200px] border'><Calendar /></div>
              </div>}

            </div>
            <div className={`w-[200px] bg-white rounded-xl cursor relative border
                ${boxFlag[2] ? 'rounded-b-none event' : 'rounded-b-xl'}`}
              onClick={() => setBoxFlag(toggleOneFlag(boxFlag, 2))}>
              {boxFlag[2] && <div ref={refs[2]} className='absolute w-full h-40 bg-white border-t z-10 rounded-b-xl shadow-md top-16'
                onClick={(e) => e.stopPropagation()}>

              </div>}
            </div>
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