import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import NextLink from "@/components/ui/NextLink"
import AdminPage from "@/components/admin/AdminPage"
import { ADMIN_NAV } from "@/components/admin/navItems"

// 대시보드: 지금은 각 관리 화면 바로가기만 있습니다.
// TODO: 최근 글, 신규 회원 수 같은 요약 정보
export default function AdminDashboardPage() {
  return (
    <AdminPage title="대시보드">
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {ADMIN_NAV.filter((item) => item.href !== "/admin").map((item) => (
          <Grid key={item.href} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card variant="outlined">
              <CardActionArea component={NextLink} href={item.href}>
                <CardContent>
                  <Typography sx={{ fontWeight: 700 }}>{item.label}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AdminPage>
  )
}
