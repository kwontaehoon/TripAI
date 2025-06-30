"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import HamburgetMenu from "../../../public/svg/HamburgerMenu.svg"
import Search from "../../../public/svg/Search.svg"
import { useAtom } from "jotai"
import { modalUiStateAtom } from "@/store/ai"
import { Bot } from "lucide-react"
import { useRouter } from "next/navigation"

const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth
}

const Page = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)

  const [lastScrollY, setLastScrollY] = useState(0)

  const [aiImodalUiStatenput, _] = useAtom(modalUiStateAtom)

  const shouldDisableScroll = Object.values(aiImodalUiStatenput).some(
    (state) => state,
  )

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

  return (
    <div>
      {/* PC */}
      <header
        className={`
          w-full h-16
          hidden fixed top-0 left-0 z-50
          bg-white shadow-md opacity-90
          transition-transform duration-300
          lg:flex
          ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* <Link href="/" className="w-32 bg-red-500"></Link> */}
        <div className="flex items-center space-x-3 ml-40 cursor-pointer" onClick={()=>router.push("/")} data-oid="ql01c4f">
          <div
            className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
            data-oid="z:8zjcf"
          >
            <Bot className="w-6 h-6 text-white" data-oid="9j36uv9" />
          </div>
          <div data-oid="y48qvjl">
            <h1 className="text-xl font-bold text-gray-900" data-oid="k4pr8ar">
              TripAI
            </h1>
            <p className="text-xs text-gray-500" data-oid="ozt3nzt">
              AI 여행 코스 추천
            </p>
          </div>
        </div>
        <div className="mr-40 flex-1 flex flex-row-reverse">
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
      </header>
      {/* PC */}

      {/* Mobile */}
      <header>
        <div
          className={`
            w-full h-16
            flex fixed items-center top-0 left-0
            bg-white z-10 shadow-md
            lg:hidden`}
        >
          <div>Logo</div>
          <div className="flex-1 flex justify-end items-center">
            <Image src={Search} alt="Search" className="mr-1 w-8 h-8" />
            <Image src={HamburgetMenu} alt="Hamburger Menu" />
          </div>
        </div>
      </header>
      {/* Mobile */}
    </div>
  )
}

export default Page
