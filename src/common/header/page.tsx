"use client"
import { introModalAtom, modalUiStateAtom } from "@/store/ai"
import { useAtom } from "jotai"
import { Bot } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth
}

const Page = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)

  const [lastScrollY, setLastScrollY] = useState(0)

  const [aiImodalUiStatenput] = useAtom(modalUiStateAtom)

  const shouldDisableScroll = Object.values(aiImodalUiStatenput).some(
    (state) => state,
  )

  const [introModal] = useAtom(introModalAtom)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth()
    const headers = document.querySelectorAll("header")

    if (shouldDisableScroll) {
      headers.forEach((header) => {
        ;(header as HTMLElement).style.paddingRight = `${scrollbarWidth}px`
      })
    }

    return () => {
      headers.forEach((header) => {
        ;(header as HTMLElement).style.paddingRight = "0px"
      })
    }
  }, [shouldDisableScroll])

  if(introModal) return

  return (
      <header
        className={`
          w-full h-16
          flex fixed
          top-0 left-0 z-50
          bg-white shadow-md opacity-90
          transition-transform duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex w-full justify-between max-w-6xl mx-auto">
          {/* <Link href="/" className="w-32 bg-red-500"></Link> */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => router.push("/")}
            data-oid="ql01c4f"
          >
            <div
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
              data-oid="z:8zjcf"
            >
              <Bot className="w-6 h-6 text-white" data-oid="9j36uv9" />
            </div>
            <div data-oid="y48qvjl">
              <h1
                className="text-xl font-bold text-gray-900"
                data-oid="k4pr8ar"
              >
                TripAI
              </h1>
              <p className="text-xs text-gray-500" data-oid="ozt3nzt">
                AI 여행 코스 추천
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-row-reverse">
            <div className="flex items-center space-x-4" data-oid="82r:.7-">
              <button
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => router.push("/login")}
              >
                로그인
              </button>
              <button
                className="
              px-4 py-2
              rounded-lg
              text-white
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:shadow-lg"
                onClick={() => router.push("/signup")}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Page
