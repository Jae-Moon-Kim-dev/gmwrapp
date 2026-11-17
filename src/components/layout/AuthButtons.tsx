import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import NextLink from "@/components/ui/NextLink"
import { getCurrentUser } from "@/lib/auth"
import { signOut } from "@/app/login/actions"

export default async function AuthButtons() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <Button component={NextLink} href="/login" color="inherit" size="small">
        로그인
      </Button>
    )
  }

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {user.role === "admin" && (
        <Button component={NextLink} href="/admin" color="inherit" size="small">
          관리자
        </Button>
      )}
      <form action={signOut}>
        <Button type="submit" color="inherit" size="small">
          로그아웃
        </Button>
      </form>
    </Box>
  )
}
