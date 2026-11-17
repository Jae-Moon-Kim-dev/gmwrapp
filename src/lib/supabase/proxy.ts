// 요청마다 로그인 세션(토큰)을 갱신해서 쿠키에 다시 써 줍니다.
// src/proxy.ts에서 호출합니다.
import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import type { Database } from "@/types/database"
import { SUPABASE_URL, SUPABASE_KEY } from "./env"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // 이 호출이 만료된 토큰을 갱신합니다. 지우지 마세요.
  const { data } = await supabase.auth.getClaims()
  const isLoggedIn = !!data?.claims

  // /admin 은 로그인 필수 (관리자 여부는 페이지에서 다시 확인)
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("next", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return response
}
