'use client'
import React from 'react'
import { useAtom } from 'jotai'

// store
import { modalUiStateAtom } from '@/store/ai'

// layout
import AiInput from './ai-input'


const index = () => {

  const [aiImodalUiStatenput, _] = useAtom(modalUiStateAtom);

  return (
    <div>
      {aiImodalUiStatenput.aiInput && <AiInput />}
    </div>
  )
}

export default index