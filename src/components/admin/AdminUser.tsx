import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { getCurrentUser } from "@/lib/auth"
import { signOut } from "@/app/(site)/login/actions"

// 상단바 오른쪽: 로그인한 관리자 이름 + 로그아웃
// 표시용입니다. 권한 검사는 각 페이지의 requireAdmin()이 합니다.
export default async function AdminUser() {
  const user = await getCurrentUser()
  if (!user) return null

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
        {user.name ?? user.email}
      </Typography>
      <form action={signOut}>
        <Button type="submit" color="inherit" size="small">
          로그아웃
        </Button>
      </form>
    </Box>
  )
}
