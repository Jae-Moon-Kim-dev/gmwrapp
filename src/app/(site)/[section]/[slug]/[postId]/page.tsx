import { notFound } from "next/navigation"
import { Suspense } from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import NextLink from "@/components/ui/NextLink"
import { getMenuByPath } from "@/lib/menus"
import { getAuthorNames, getPost, increaseViewCount } from "@/lib/posts"
import { formatDate } from "@/lib/format"
import PageHeader from "@/components/board/PageHeader"
import Loading from "@/components/board/Loading"

export default async function PostPage({ params }: PageProps<"/[section]/[slug]/[postId]">) {
  return (
    <Suspense fallback={<Container maxWidth="md" sx={{ py: 5 }}><Loading /></Container>}>
      <PostDetail params={params} />
    </Suspense>
  )
}

async function PostDetail({ params }: { params: PageProps<"/[section]/[slug]/[postId]">["params"] }) {
  const { section, slug, postId } = await params
  const found = await getMenuByPath(section, slug)
  const id = Number(postId)
  if (!found || !Number.isInteger(id)) notFound()

  // 권한이 없거나 다른 메뉴의 글이면 404
  const post = await getPost(id)
  if (!post || post.menu_id !== found.menu.id) notFound()

  await increaseViewCount(post.id)
  const authors = await getAuthorNames([post.user_id])

  return (
    <>
      <PageHeader group={found.group.name} title={found.menu.name} />
      <Container maxWidth="md" component="article" sx={{ py: 5 }}>
        <Box sx={{ borderTop: 2, borderBottom: 1, borderColor: "divider", borderTopColor: "primary.main", py: 2.5 }}>
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            {post.user_id ? authors.get(post.user_id) : "-"} · {formatDate(post.created_at)} · 조회{" "}
            {post.view_count + 1}
          </Typography>
        </Box>

        {/* TODO: 에디터를 붙이면 HTML 렌더링으로 바꾸세요 */}
        <Typography sx={{ minHeight: 160, py: 4, lineHeight: 2, whiteSpace: "pre-wrap", borderBottom: 1, borderColor: "divider" }}>
          {post.content}
        </Typography>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button component={NextLink} href={`/${section}/${slug}`} variant="outlined">
            목록
          </Button>
        </Box>
      </Container>
    </>
  )
}
