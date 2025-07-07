"use client"
import { useEffect } from "react"
import { useBoardsQuery, useCoursesQuery } from "@/hooks/supabase/dev"
import { Camera, Mountain } from "lucide-react"
import Left from "./left/page"
import Right from "./right/page"
import Skeleton from "./skeleton"
import { useAtom } from "jotai"
import { introModalAtom } from "@/store/ai"
import Image from "next/image"

const Page = () => {
  const { isLoading: boardsDataIsLoading } = useBoardsQuery()
  const { isLoading: coursesDataIsLoading } = useCoursesQuery()

  const [_, setIntroModal] = useAtom(introModalAtom)

  // 페이지 로딩 시뮬레이션 및 Trip AI 소개 모달 표시 로직
  useEffect(() => {
    const timer = setTimeout(() => {
      // 로딩 완료 후 Trip AI 소개 모달 표시 여부 확인
      const lastShown = localStorage.getItem("tripai-intro-last-shown")
      const now = new Date().getTime()
      const oneDay = 24 * 60 * 60 * 1000 // 24시간을 밀리초로 변환

      if (!lastShown || now - parseInt(lastShown) > oneDay) {
        // 처음 방문이거나 하루가 지났으면 모달 표시
        setTimeout(() => {
          setIntroModal(true)
        }, 500) // 페이지 로딩 후 0.5초 뒤에 모달 표시
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  

  // const { data: pageNationData, isLoading, isFetching } = useTestPageNationQuery(state)

  // useEffect(() => {
  //   console.log("isLoading: ", isLoading, isFetching)
  // }, [pageNationData])

  // const { data: session } = useSession()
  // console.log(session)

  // if (session) {
  //   return (
  //     <div className='py-28'>
  //       <p>{session.user?.name} 님 환영합니다!</p>
  //       <div>123</div>
  //       <button onClick={() => signOut()}>로그아웃</button>
  //     </div>
  //   );
  // }

  return boardsDataIsLoading || coursesDataIsLoading ? (
    <Skeleton />
  ) : (
    <div
      className="
        bg-#f8fafc
        justify-center
        py-28 mb-4 space-x-0
        lg:flex lg:mb-12 lg:space-x-12"
    >
      {/* <div className="py-28">
        <button onClick={() => signIn("kakao", { callbackUrl: "/" })}>
          카카오 로그인
        </button>
        <br />
        <button onClick={() => signIn("google", { callbackUrl: "/" })}>
          구글 로그인
        </button>
        <br />
        <button onClick={() => signIn("naver", { callbackUrl: "/" })}>
          네이버 로그인
        </button>
      </div> */}

      {/* <div className="w-40 border">
        <Image 
        src={"https://tvkqolkaaqmqftrawadd.supabase.co/storage/v1/object/public/trip-ai//aaa.PNG"} 
        width={100}
        height={0}
        alt="Landscape picture"
        />
      </div> */}

      <Left />
      <Right />

      {/* Floating Elements */}
      <div
        className="absolute hidden 2xl:block top-32 left-20 animate-bounce"
        data-oid="44lb0:h"
      >
        <div className="bg-white rounded-full p-4 shadow-lg" data-oid=".wyh69n">
          <Camera className="h-6 w-6 text-blue-600" data-oid="v._bw-7" />
        </div>
      </div>
      <div
        className="absolute hidden 2xl:block top-32 right-20 animate-bounce delay-1000"
        data-oid="w62gl6y"
      >
        <div className="bg-white rounded-full p-4 shadow-lg" data-oid="sd40lp9">
          <Mountain className="h-6 w-6 text-green-600" data-oid="-kbcjph" />
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className='py-28'>
  //     <button onClick={() => signIn("kakao", { callbackUrl: "/" })}>카카오 로그인</button>
  //     <br />
  //     <button onClick={() => signIn("google", { callbackUrl: "/" })}>구글 로그인</button>
  //     <br />
  //     <button onClick={() => signIn("naver", { callbackUrl: "/" })}>네이버 로그인</button>
  //   </div>
  // );
}

export default Page
