"use client"
import React from "react"
import { useAtom } from "jotai"

// store
import { introModalAtom, modalUiStateAtom } from "@/store/ai"

// layout
import AiInput from "./ai-input"
import Intro from './intro'

const Page = () => {
  const [aiImodalUiStatenput] = useAtom(modalUiStateAtom)
  const [introModal] = useAtom(introModalAtom)

  return <div>
    {aiImodalUiStatenput.aiInput && <AiInput />}
    {introModal && <Intro />}
    </div>
}

export default Page
