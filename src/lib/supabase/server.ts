// 서버(Server Component, Server Action, Route Handler)에서 쓰는 Supabase 클라이언트
// 로그인 쿠키를 읽기 때문에 RLS가 "로그인한 사용자" 기준으로 적용됩니다.
import "server-only"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/database"
import { SUPABASE_URL, SUPABASE_KEY } from "./env"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server Component에서는 쿠키를 쓸 수 없어 무시합니다.
          // 세션 갱신은 proxy.ts가 담당합니다.
        }
      },
    },
  })
}
