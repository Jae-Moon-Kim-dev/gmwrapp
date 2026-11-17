"use client"

import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import { signIn, type LoginState } from "./actions"

export default function LoginForm() {
  const next = useSearchParams().get("next") ?? "/"
  const [state, formAction, pending] = useActionState<LoginState, FormData>(signIn, {})

  return (
    <Stack component="form" action={formAction} spacing={2.5}>
      <input type="hidden" name="next" value={next} />
      <TextField name="email" type="email" label="이메일" autoComplete="email" required fullWidth />
      <TextField name="password" type="password" label="비밀번호" autoComplete="current-password" required fullWidth />
      {state.error && <Alert severity="error">{state.error}</Alert>}
      <Button type="submit" variant="contained" size="large" disabled={pending}>
        {pending ? "로그인 중..." : "로그인"}
      </Button>
    </Stack>
  )
}
