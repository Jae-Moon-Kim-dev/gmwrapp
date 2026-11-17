import type { Metadata } from "next"
import { Suspense } from "react"
import LoginForm from "./LoginForm"

export const metadata: Metadata = { title: "로그인" }

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-8 text-center text-2xl font-extrabold text-brand-700">로그인</h1>
      {/* useSearchParams를 쓰므로 Suspense 필요 */}
      <Suspense>
        <LoginForm />
      </Suspense>
      {/* TODO: 회원가입 페이지 (약관은 교회 상황에 맞게 새로 작성 필요) */}
    </div>
  )
}
