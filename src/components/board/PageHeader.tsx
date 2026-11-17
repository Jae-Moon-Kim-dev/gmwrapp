import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import NextLink from "@/components/ui/NextLink"

// 하위 페이지 상단 제목 + 경로 표시
export default function PageHeader({ group, title }: { group: string; title: string }) {
  return (
    <Box sx={{ bgcolor: "brand.soft", py: 5 }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ fontSize: 14 }}>
          <Box component={NextLink} href="/" sx={{ "&:hover": { color: "primary.main" } }}>
            홈
          </Box>
          <span>{group}</span>
          <Typography sx={{ fontSize: 14, color: "text.primary" }}>{title}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" component="h1" sx={{ mt: 1, color: "primary.main" }}>
          {title}
        </Typography>
      </Container>
    </Box>
  )
}
