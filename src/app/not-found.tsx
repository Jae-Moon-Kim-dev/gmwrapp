import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import NextLink from "@/components/ui/NextLink"

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
      <Typography variant="h5" component="h1" sx={{ color: "primary.main" }}>
        페이지를 찾을 수 없습니다
      </Typography>
      <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
        주소가 바뀌었거나 볼 수 있는 권한이 없는 글이에요.
      </Typography>
      <Button component={NextLink} href="/" variant="contained" sx={{ mt: 4 }}>
        홈으로
      </Button>
    </Container>
  )
}
