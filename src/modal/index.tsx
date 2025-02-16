'use client'
import React from 'react'
import { useAtom } from 'jotai'

// store
import { aiInputAtom } from '@/store/ai'

// layout
import AiInput from './ai-input'


const index = () => {

  const [aiInput, setAiInput] = useAtom(aiInputAtom);

  return (
    <div>
      {aiInput && <AiInput onClose={() => setAiInput(false)} />}
    </div>
  )
}

export default index