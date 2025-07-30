import type { Metadata } from "next"
import "./globals.css"
import Header from "@/common/header/page"
import Footer from "@/common/footer/page"
import Modal from "@/modal"
import QueryClientProvider from "@/config/provider/queryClientProvider"
import { ScrollController } from "@/util/scrollController"
import { Suspense } from "react"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Suspense fallback={<></>}> */}
          <QueryClientProvider>
            {/* <div id="global-modal"></div> */}
            <Modal />
            <ScrollController />
            <Header />
            {children}
            <Footer />
          </QueryClientProvider>
        {/* </Suspense> */}
      </body>
    </html>
  )
}
