import React, { useState } from 'react'
import One from './one'
import Two from './two'
import { useGeminiAiMutation } from '@/hooks/dev'

const page = () => {

  return (
    <div className='py-28'>
        <One />
        <Two />
    </div>
  )
}

export default page