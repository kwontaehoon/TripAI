"use client"
import React from "react"
import { useAtom } from "jotai"

// store
import { introModalAtom, loadingModalAtom, modalUiStateAtom } from "@/store/ai"

// layout
import AiInput from "./ai-input"
import Intro from './intro'
import Loading from './loading'

const Page = () => {
  const [aiImodalUiStatenput] = useAtom(modalUiStateAtom)
  const [introModal] = useAtom(introModalAtom)
  const [loadingModal] = useAtom(loadingModalAtom)

  return <div>
    {aiImodalUiStatenput.aiInput && <AiInput />}
    {introModal && <Intro />}
    {loadingModal && <Loading />}
    </div>
}

export default Page
