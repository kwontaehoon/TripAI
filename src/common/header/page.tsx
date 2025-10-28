"use client"
import { getUserInfo } from "@/service/supabase"
import { createClient } from "@/service/supabase/client"
import { introModalAtom, modalUiStateAtom, userInfoAtom } from "@/store/ai"
import { useAtom } from "jotai"
import { Bot, User, LogOut, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { If } from "react-haiku"

const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth
}

const Page = () => {
  const router = useRouter()
  const supabase = createClient()
  const mobileWidth = 1024
  const [sessionInfo, setSessionInfo] = useState<string | object>("")
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [isVisible, setIsVisible] = useState(true)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [lastScrollY, setLastScrollY] = useState(0)

  const [aiModalUiStateModal] = useAtom(modalUiStateAtom)

  const [introModal] = useAtom(introModalAtom)

  const shouldDisableScroll = Object.values(aiModalUiStateModal).some(
    (state) => state,
  )

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session === null) {
        setSessionInfo("not login")
      } else setSessionInfo(session)
    }
    getSession()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isMobile = window.innerWidth <= mobileWidth

      if (isMobile) {
        setIsVisible(true)
        return
      }

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

  if (introModal || aiModalUiStateModal.aiInput) return

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    setUserInfo(null)
    setIsDropdownOpen(false)
    window.location.reload()
  }

  return (
    <header
      className={`
          w-full h-16
          pl-5
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
            <h1 className="text-xl font-bold text-gray-900" data-oid="k4pr8ar">
              TripAI
            </h1>
            <p className="text-xs text-gray-500" data-oid="ozt3nzt">
              AI 여행 코스 추천
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-row-reverse pr-4" data-oid="nst0g5j">
          <div className="flex items-center space-x-4" data-oid="j6cwnl9">
            {sessionInfo === "" ? (
              <div
                className="flex items-center space-x-2 p-2"
                data-oid="skeleton-loader"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded hidden md:block animate-pulse" />
              </div>
            ) : sessionInfo === "not login" ? (
              // Not Logged In UI
              <>
                <button
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => router.push("/login")}
                  data-oid="r31ptmq"
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
                  data-oid="meq27pg"
                >
                  회원가입
                </button>
              </>
            ) : !userInfo ? (
              ""
            ) : (
              <>
                {/* User Menu */}
                <div className="relative" data-oid="cw85quk">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    data-oid="r9its24"
                  >
                    <span
                      className="text-lg sm:text-xl w-8 h-8 rounded-full relative"
                      data-oid="aqxkzhp"
                    >
                      <If isTrue={userInfo}>
                        <Image
                          src={`https://tvkqolkaaqmqftrawadd.supabase.co/storage/v1/object/public/trip-ai/${userInfo.profile_image_url}`}
                          className="rounded-full overflow-hidden"
                          alt={userInfo.name}
                          fill
                          sizes="32w"
                        />
                      </If>
                      <If isTrue={userInfo === undefined}>
                        <div
                          className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
                          data-oid="dzrezk7"
                        >
                          <User
                            className="w-4 h-4 text-white"
                            data-oid="0ez2wo7"
                          />
                        </div>
                      </If>
                    </span>

                    <span
                      className="text-sm font-medium text-gray-700 hidden md:block"
                      data-oid=":h9uxts"
                    >
                      {!userInfo ? "" : userInfo.name}
                    </span>
                    <ChevronDown
                      className="w-4 h-4 text-gray-500"
                      data-oid="cl8b:bv"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border !border-gray-200 py-1 z-50"
                      data-oid="4mx4unu"
                    >
                      <div
                        className="px-4 py-2 border-b !border-gray-100"
                        data-oid="po7wtbf"
                      >
                        <p
                          className="text-sm font-medium text-gray-900"
                          data-oid="44ie_.b"
                        >
                          {!userInfo ? "" : userInfo.name}
                        </p>
                        <p className="text-xs text-gray-500" data-oid="i9.yd_6">
                          {!userInfo ? "" : userInfo.email}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsDropdownOpen(false)
                          router.push("/mypage")
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        data-oid="4bh8-0u"
                      >
                        <User className="w-4 h-4 mr-3" data-oid="0d_kz7_" />
                        마이페이지
                      </button>

                      <div
                        className="border-t !border-gray-100 mt-1"
                        data-oid="a554bvq"
                      >
                        <button
                          onClick={signOut}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          data-oid=".p6znc0"
                        >
                          <LogOut className="w-4 h-4 mr-3" data-oid="_2pm1ze" />
                          로그아웃
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Page
