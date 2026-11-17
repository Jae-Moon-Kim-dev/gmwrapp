import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { signOut } from "@/app/login/actions"

export default async function AuthButtons() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <Link href="/login" className="rounded px-3 py-1.5 text-sm hover:bg-white/10">
        로그인
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {user.role === "admin" && (
        <Link href="/admin" className="rounded px-3 py-1.5 hover:bg-white/10">
          관리자
        </Link>
      )}
      <form action={signOut}>
        <button className="rounded px-3 py-1.5 hover:bg-white/10">로그아웃</button>
      </form>
    </div>
  )
}
