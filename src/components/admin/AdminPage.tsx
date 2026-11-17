import { Suspense } from "react"
import Typography from "@mui/material/Typography"
import { requireAdmin } from "@/lib/auth"
import Loading from "@/components/board/Loading"

// 관리자 페이지 공통 틀: 제목 + 권한 검사 + 로딩 표시
// children은 requireAdmin()을 통과한 뒤에만 그려집니다.
//
// 사용 예)
//   export default function Page() {
//     return <AdminPage title="메뉴 관리"><MenuList /></AdminPage>
//   }
export default function AdminPage({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Typography variant="h5" component="h1" sx={{ color: "primary.main", fontWeight: 700 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
          {description}
        </Typography>
      )}
      <Suspense fallback={<Loading rows={4} />}>
        <AdminGuard>{children}</AdminGuard>
      </Suspense>
    </>
  )
}

async function AdminGuard({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return <>{children}</>
}
