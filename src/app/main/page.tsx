
import { Camera, Mountain } from "lucide-react"
import Left from "./left/page"
import Right from "./right/page"
import Intro from './Intro'
import { createClient } from "@/service/supabase/server"
import { getUserInfo } from "@/service/supabase"
// import { useSession } from "next-auth/react"
// import { queryClient } from "@/config/provider/queryClientProvider"
// import { Metadata, ResolvingMetadata } from "next"

const Page = async() => {

  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const userInfo = !session ? null : await getUserInfo(session?.user.email)
  
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

  return (  
    <div
      className="
        bg-#f8fafc
        justify-center
        px-4 lg:px-0 py-28 mb-4 space-x-0
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

      <Intro />
      <Left initialUserInfo={userInfo} />
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
