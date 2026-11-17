"use client"

import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { signIn, type LoginState } from "./actions"

export default function LoginForm() {
  const next = useSearchParams().get("next") ?? "/"
  const [state, formAction, pending] = useActionState<LoginState, FormData>(signIn, {})

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <label className="block">
        <span className="mb-1 block text-sm font-bold">이메일</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-bold">비밀번호</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
        />
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        disabled={pending}
        className="w-full rounded bg-brand-600 py-2.5 font-bold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  )
}
