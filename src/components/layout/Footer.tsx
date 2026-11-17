import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8, bgcolor: "primary.dark", color: "grey.400", py: 4 }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontWeight: 700, color: "common.white" }}>광명우리교회</Typography>
        {/* TODO: 주소, 전화번호를 실제 정보로 바꾸세요 (site_settings 테이블로 옮겨도 좋아요) */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          경기도 광명시 · 전화 000-0000-0000
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 2, color: "grey.600" }}>
          © 광명우리교회. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}
