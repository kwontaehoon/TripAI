"use client"
import React from "react"
import { useAtom } from "jotai"

// store
import { accountDeleteAtom, introModalAtom, loadingModalAtom, modalUiStateAtom, passwordChangeAtom } from "@/store/ai"

// layout
import AiInput from "./ai-input"
import Intro from './intro'
import Loading from './loading'
import PasswordChange from './passwordChange'
import AccountDelete from "./accountDelete"

const Page = () => {
  const [aiImodalUiStatenput] = useAtom(modalUiStateAtom)
  const [introModal] = useAtom(introModalAtom)
  const [loadingModal] = useAtom(loadingModalAtom)
  const [passwordChangeModal] = useAtom(passwordChangeAtom)
  const [accountDeleteModal] = useAtom(accountDeleteAtom)

  return <div>
    {aiImodalUiStatenput.aiInput && <AiInput />}
    {introModal && <Intro />}
    {loadingModal && <Loading />}
    {passwordChangeModal && <PasswordChange />}
    {accountDeleteModal.isOpen && <AccountDelete />}
    </div>
}

export default Page
