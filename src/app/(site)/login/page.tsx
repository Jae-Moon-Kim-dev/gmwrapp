import type { Metadata } from "next"
import { Suspense } from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import LoginForm from "./LoginForm"

export const metadata: Metadata = { title: "로그인" }

export default function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ py: 10 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 4, textAlign: "center", color: "primary.main" }}>
        로그인
      </Typography>
      {/* useSearchParams를 쓰므로 Suspense 필요 */}
      <Suspense>
        <LoginForm />
      </Suspense>
      {/* TODO: 회원가입 페이지 (약관은 교회 상황에 맞게 새로 작성 필요) */}
    </Container>
  )
}
