'use client'
import { useEffect } from "react"
import { useAtomValue } from "jotai"
import { accountDeleteAtom, loadingModalAtom, modalUiStateAtom, passwordChangeAtom } from "@/store/ai"

export function ScrollController() {
  const modalUiState = useAtomValue(modalUiStateAtom)
  const loadingState = useAtomValue(loadingModalAtom)
  const passwordChangeState = useAtomValue(passwordChangeAtom)
  const accountDeleteState = useAtomValue(accountDeleteAtom)
  const shouldDisableScroll = Object.values(modalUiState).some((v) => v) || loadingState.isOpen || passwordChangeState || accountDeleteState.isOpen

  useEffect(() => {
    if (shouldDisableScroll) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = "hidden"
      document.body.style.marginRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = "auto"
      document.body.style.marginRight = "0px"
    }

    return () => {
      document.body.style.overflow = "auto"
      document.body.style.marginRight = "0px"
    }
  }, [shouldDisableScroll])

  return null
}
