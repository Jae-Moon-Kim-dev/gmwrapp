// 게시글 조회
// 읽기 권한은 DB의 RLS(menu_roles)가 판단하므로, 로그인 쿠키를 가진 클라이언트로 읽습니다.
import "server-only"
import { createClient } from "@/lib/supabase/server"

export const PAGE_SIZE = 15

export async function getPosts(menuId: number, page = 1) {
  const supabase = await createClient()
  const from = (page - 1) * PAGE_SIZE

  const { data, count, error } = await supabase
    .from("posts")
    .select("id, title, is_notice, view_count, created_at, user_id", { count: "exact" })
    .eq("menu_id", menuId)
    .order("is_notice", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1)

  if (error) throw error
  return { posts: data, total: count ?? 0 }
}

export async function getPost(postId: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .maybeSingle()

  if (error) throw error
  return data
}

/** 'page' 메뉴(교회소개 등)는 그 메뉴의 최신 글 1개를 본문으로 씁니다. */
export async function getPageContent(menuId: number) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("posts")
    .select("title, content, updated_at")
    .eq("menu_id", menuId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()
  return data
}

export async function increaseViewCount(postId: number) {
  const supabase = await createClient()
  await supabase.rpc("increment_post_view", { p_post_id: postId })
}

/** 작성자 이름 목록 (user_id → name) */
export async function getAuthorNames(userIds: (string | null)[]) {
  const ids = [...new Set(userIds.filter((id): id is string => !!id))]
  if (ids.length === 0) return new Map<string, string>()

  const supabase = await createClient()
  const { data } = await supabase.from("profiles").select("id, name").in("id", ids)
  return new Map((data ?? []).map((p) => [p.id, p.name ?? "이름없음"]))
}
