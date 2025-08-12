import type { Metadata } from "next"
import "./globals.css"
import Header from "@/common/header/page"
import Footer from "@/common/footer/page"
import Modal from "@/modal"
import QueryClientProvider from "@/config/provider/queryClientProvider"
import { ScrollController } from "@/util/scrollController"
import { Suspense } from "react"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import {
  prefetchBoardDetails,
  prefetchBoards,
  prefetchCourseDetails,
  prefetchCourses,
  prefetchCoursesAndBoards,
} from "@/service/prefetch"
import { Hydration } from "./Hydration"
import { NextAuthSessionProvider } from "@/config/provider/sessionProvider"
import { AuthProvider } from "@/config/provider/authProvider"
import { createClient } from "@/service/supabase/server"

export const metadata: Metadata = {
  title: "TripAI",
  description:
    "AI가 추천하는 맞춤형 여행 코스로 특별한 추억을 만들어보세요. 현지인이 추천하는 숨겨진 명소까지 모두 담았습니다.",
  keywords: "여행, 여행코스, 여행추천, 국내여행, 해외여행, 여행계획",
  icons: {
    icon: "/img/favicon.PNG",
  },
  openGraph: {
    title: "TripAI",
    description: "AI가 추천하는 맞춤형 여행 코스로 특별한 추억을 만들어보세요.",
    type: "website",
  },
}

// prefech
const queryClient = new QueryClient()
await prefetchCourses(queryClient)
await prefetchBoards(queryClient)

await prefetchCoursesAndBoards(queryClient)

await Promise.all(
  [1, 2, 3, 4].map((id) => prefetchCourseDetails(queryClient, id)),
)
await Promise.all(
  [1, 3, 6, 63].map((id) => prefetchBoardDetails(queryClient, id)),
)


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body>
      <head>
        <meta name="naver-site-verification" content="e3c5ec6e135ce21f551650839ebfa0a1a755e4ee" />
      </head>
        <Suspense fallback={<></>}>

            {/* <NextAuthSessionProvider> */}
            <QueryClientProvider>
            <AuthProvider>
              {/* <div id="global-modal"></div> */}
              <Hydration state={dehydrate(queryClient)}>
                <Modal />
                <ScrollController />
                <Header initialSession={session} />
                {children}
                <Footer />
              </Hydration>
              </AuthProvider>
            </QueryClientProvider>

          {/* </NextAuthSessionProvider> */}
        </Suspense>
      </body>
    </html>
  )
}
