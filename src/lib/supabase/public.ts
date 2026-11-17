// 쿠키 없이 "방문자" 권한으로 읽는 클라이언트
// 메뉴처럼 누구에게나 같은 데이터는 이걸로 읽어서 캐시합니다.
import "server-only"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"
import { SUPABASE_URL, SUPABASE_KEY } from "./env"

export function createPublicClient() {
  return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
