// 브라우저(Client Component)에서 쓰는 Supabase 클라이언트
"use client"

import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"
import { SUPABASE_URL, SUPABASE_KEY } from "./env"

export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_KEY)
}
