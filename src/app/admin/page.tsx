import type { Metadata } from "next"
import { Suspense } from "react"
import { requireAdmin } from "@/lib/auth"

export const metadata: Metadata = { title: "관리자" }

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-brand-700">관리자</h1>
      <Suspense fallback={<p className="mt-6 text-gray-400">확인 중...</p>}>
        <AdminContent />
      </Suspense>
    </div>
  )
}

async function AdminContent() {
  const user = await requireAdmin()

  return (
    <div className="mt-6 space-y-2">
      <p>{user.name ?? user.email}님, 환영합니다.</p>
      {/* TODO: 메뉴 관리, 권한 관리, 게시글 관리, 회원 관리 */}
      <ul className="list-inside list-disc text-gray-600">
        <li>메뉴 관리 (menus)</li>
        <li>메뉴별 권한 (menu_roles)</li>
        <li>회원 권한 변경 (profiles.role_id)</li>
      </ul>
    </div>
  )
}
