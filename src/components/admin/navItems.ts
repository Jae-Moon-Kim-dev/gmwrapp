// 관리자 메뉴 목록. 화면을 추가하면 여기에도 한 줄 추가하세요.
export const ADMIN_NAV = [
  { href: "/admin", label: "대시보드", icon: "dashboard" },
  { href: "/admin/menus", label: "메뉴 관리", icon: "menus" },
  { href: "/admin/permissions", label: "메뉴별 권한", icon: "permissions" },
  { href: "/admin/posts", label: "게시글 관리", icon: "posts" },
  { href: "/admin/members", label: "회원 관리", icon: "members" },
] as const

export type AdminNavIcon = (typeof ADMIN_NAV)[number]["icon"]
