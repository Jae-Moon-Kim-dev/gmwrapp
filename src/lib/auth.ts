// 로그인 사용자 정보를 가져오는 곳 (Data Access Layer)
// 화면에서는 이 함수만 쓰고, Supabase를 직접 부르지 않도록 합니다.
import "server-only"
import { cache } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type CurrentUser = {
  id: string
  email: string | null
  name: string | null
  role: "admin" | "member" | "guest"
}

/** 로그인 안 했으면 null. 한 요청 안에서는 한 번만 조회합니다. */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims
  if (!claims) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, roles(code)")
    .eq("id", claims.sub)
    .single()

  return {
    id: claims.sub,
    email: (claims.email as string | undefined) ?? null,
    name: profile?.name ?? null,
    role: (profile?.roles?.code as CurrentUser["role"]) ?? "member",
  }
})

/** 관리자만 통과. 아니면 로그인 페이지 또는 홈으로 보냅니다. */
export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user) redirect("/login?next=/admin")
  if (user.role !== "admin") redirect("/")
  return user
}
