"use client"

import { useEffect, useState } from "react"
import PC from "./pc"
import Mobile from "./mobile"

const Page = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  if (isMobile === null) return null

  return isMobile ? <Mobile /> : <PC />
}

export default Page
