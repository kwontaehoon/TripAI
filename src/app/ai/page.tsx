"use client"
import AiInput from "@/app/modal/ai-input.base"
import React, { useState } from "react"
import { modalUiStateAtom } from "@/store/ai"
import { useAtom } from "jotai"

const page = () => {
  const [modalUiState, setModalUiState] = useAtom(modalUiStateAtom)

  return (
    <div className="flex lg:px-32 lg:py-32 px-4 py-32">
      <div className="flex-1"></div>
      <div className="w-[900px]">
        <div className="mb-2">AI 추천 코스</div>
        <div className="mb-5">지역 선택</div>
        <div className="w-full h-20 flex justify-center mb-12">
          <div className="bg-blue-50 flex-1 mx-12 rounded-xl"></div>
        </div>
        <div className="flex justify-between flex-wrap gap-5">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="cursor border lg:w-[calc(30%)] w-[calc(50%-10px)] lg:h-[250px] h-[150px] rounded-xl"
              onClick={() =>
                setModalUiState({ ...modalUiState, aiInput: true })
              }
            ></div>
          ))}
        </div>
      </div>

      {/* {showModal && createPortal(
        <AiInput onClose={() => setShowModal(false)} />,
        document.body
      )} */}
      <div className="flex-1"></div>
    </div>
  )
}

export default page
