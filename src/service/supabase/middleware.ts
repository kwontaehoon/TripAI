import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { getUserInfo } from "."

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const loginPath = "/login"
  const writePath = "/board/write"
  const mypagePath = "/mypage"

  // 로그인 후 /login 으로 접속했을 때 / 으로 처리
  if (user && pathname === loginPath) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // 로그인 전 /board/write 으로 접속했을 때 /login 으로 처리
  if (!user && pathname === writePath) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // 로그인 전 /mypage 로 접속했을 때 /login 으로 처리
  if (!user && pathname === mypagePath) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // 게시물 상세 페이지 경로를 정규식으로 매칭
  const boardDetailsRegex = /^\/board\/details\/(\d+)/
  const match = pathname.match(boardDetailsRegex)

  if (match) {
    const boardId = match[1]
    const userInfo = await getUserInfo(user?.email)
    const cookieName = userInfo ? `viewed_board_${boardId}_${userInfo.id}` : `viewed_board_${boardId}`

    // 쿠키가 이미 존재하는지 확인
    const hasViewedCookie = request.cookies.has(cookieName)

    if (!hasViewedCookie) {
      // 1. 조회수 증가 API 호출
      const { error: view_history_insertError } = await supabase
        .from("view_history")
        .insert({
          user_id: Number(userInfo?.id) || null,
          board_id: Number(boardId),
        })

      if (view_history_insertError) {
        console.error("insertError: ", view_history_insertError)
      } else {
        // 2. 조회수 증가에 성공하면 쿠키 설정
        const oneDay = 24 * 60 * 60 * 1000
        supabaseResponse.cookies.set(cookieName, "true", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: oneDay,
        })
      }
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
