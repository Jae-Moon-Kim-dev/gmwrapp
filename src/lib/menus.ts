// 메뉴 조회
// 메뉴는 모든 방문자에게 같으므로 쿠키 없이 읽고 캐시합니다.
// 관리자 화면에서 메뉴를 바꾸면 revalidateTag("menus")로 캐시를 지우세요.
import "server-only"
import { cacheLife, cacheTag } from "next/cache"
import { createPublicClient } from "@/lib/supabase/public"
import type { Tables } from "@/types/database"

export type Menu = Tables<"menus">
export type MenuType = "group" | "page" | "board" | "gallery" | "sermon"
export type MenuGroup = Menu & { children: Menu[] }

async function getAllMenus(): Promise<Menu[]> {
  "use cache"
  cacheTag("menus")
  cacheLife("hours")

  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .order("sort_order")

  if (error) throw error
  return data
}

/** 상단 메뉴 트리: [{ 교회소개, children: [교회소개, 섬기는분, ...] }, ...] */
export async function getMenuTree(): Promise<MenuGroup[]> {
  const menus = await getAllMenus()
  return menus
    .filter((m) => m.parent_id === null)
    .map((group) => ({
      ...group,
      children: menus.filter((m) => m.parent_id === group.id),
    }))
}

/** 주소(/about/intro)로 메뉴 찾기 */
export async function getMenuByPath(section: string, slug: string) {
  const tree = await getMenuTree()
  const group = tree.find((g) => g.slug === section)
  const menu = group?.children.find((m) => m.slug === slug)
  return group && menu ? { group, menu } : null
}
