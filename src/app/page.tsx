import { Suspense } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import NextLink from "@/components/ui/NextLink"
import { getMenuByPath } from "@/lib/menus"
import { getPosts } from "@/lib/posts"
import { formatDate } from "@/lib/format"
import Loading from "@/components/board/Loading"

export default function HomePage() {
  return (
    <>
      {/* 메인 배너 - TODO: 교회 사진으로 교체 */}
      <Box
        sx={{
          color: "common.white",
          background: "linear-gradient(135deg, #2c4a72 0%, #142338 100%)",
          py: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ color: "secondary.main", fontWeight: 700 }}>환영합니다</Typography>
          <Typography variant="h2" component="h1" sx={{ mt: 1.5, fontSize: { xs: 36, md: 52 } }}>
            광명우리교회
          </Typography>
          {/* TODO: 교회 표어나 소개 문구 */}
          <Typography sx={{ mt: 2, maxWidth: 560, opacity: 0.85 }}>
            하나님을 사랑하고 이웃을 섬기는 교회
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ mt: 4 }}>
            <Button component={NextLink} href="/about/worship" variant="contained" color="secondary" size="large">
              예배시간 안내
            </Button>
            <Button component={NextLink} href="/about/location" variant="outlined" color="inherit" size="large">
              오시는 길
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 7 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Suspense fallback={<Loading rows={5} />}>
              <RecentPosts section="events" slug="notice" />
            </Suspense>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Suspense fallback={<Loading rows={5} />}>
              <RecentPosts section="community" slug="free" />
            </Suspense>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

async function RecentPosts({ section, slug }: { section: string; slug: string }) {
  const found = await getMenuByPath(section, slug)
  if (!found) return null

  const { posts } = await getPosts(found.menu.id, 1)
  const path = `/${section}/${slug}`

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: 2,
          borderColor: "primary.main",
          pb: 1,
          mb: 1,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: "primary.main" }}>
          {found.menu.name}
        </Typography>
        <Box component={NextLink} href={path} sx={{ fontSize: 14, color: "text.secondary" }}>
          더보기 +
        </Box>
      </Box>

      {posts.length === 0 ? (
        <Typography sx={{ py: 4, textAlign: "center", fontSize: 14, color: "text.disabled" }}>
          등록된 글이 없습니다.
        </Typography>
      ) : (
        posts.slice(0, 5).map((post) => (
          <Box
            key={post.id}
            sx={{ display: "flex", justifyContent: "space-between", gap: 2, py: 1.25, fontSize: 14, borderBottom: 1, borderColor: "divider" }}
          >
            <Box
              component={NextLink}
              href={`${path}/${post.id}`}
              sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", "&:hover": { color: "primary.main" } }}
            >
              {post.title}
            </Box>
            <Box component="span" sx={{ flexShrink: 0, color: "text.disabled" }}>
              {formatDate(post.created_at)}
            </Box>
          </Box>
        ))
      )}
    </Box>
  )
}
