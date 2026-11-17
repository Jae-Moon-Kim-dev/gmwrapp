import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Chip from "@mui/material/Chip"
import Box from "@mui/material/Box"
import NextLink from "@/components/ui/NextLink"
import { getAuthorNames, getPosts, PAGE_SIZE } from "@/lib/posts"
import { formatDate } from "@/lib/format"
import BoardPagination from "./BoardPagination"
import EmptyMessage from "./EmptyMessage"

type Props = {
  menuId: number
  basePath: string
  page: number
}

// 모바일에서는 번호·작성자·조회수 칸을 숨김
const hideOnMobile = { display: { xs: "none", sm: "table-cell" } }

export default async function BoardList({ menuId, basePath, page }: Props) {
  const { posts, total } = await getPosts(menuId, page)
  const authors = await getAuthorNames(posts.map((p) => p.user_id))

  if (posts.length === 0) {
    return <EmptyMessage>등록된 글이 없습니다.</EmptyMessage>
  }

  return (
    <>
      <Table size="small" sx={{ borderTop: 2, borderColor: "primary.main", "& td, & th": { py: 1.5 } }}>
        <TableHead sx={{ bgcolor: "grey.50" }}>
          <TableRow>
            <TableCell align="center" sx={{ ...hideOnMobile, width: 70 }}>번호</TableCell>
            <TableCell>제목</TableCell>
            <TableCell align="center" sx={{ ...hideOnMobile, width: 110 }}>작성자</TableCell>
            <TableCell align="center" sx={{ width: 110 }}>등록일</TableCell>
            <TableCell align="center" sx={{ ...hideOnMobile, width: 70 }}>조회</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post, i) => (
            <TableRow key={post.id} hover>
              <TableCell align="center" sx={{ ...hideOnMobile, color: "text.secondary" }}>
                {post.is_notice ? (
                  <Chip label="공지" size="small" color="secondary" />
                ) : (
                  total - (page - 1) * PAGE_SIZE - i
                )}
              </TableCell>
              <TableCell>
                <Box
                  component={NextLink}
                  href={`${basePath}/${post.id}`}
                  sx={{ "&:hover": { color: "primary.main", textDecoration: "underline" } }}
                >
                  {post.title}
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ ...hideOnMobile, color: "text.secondary" }}>
                {post.user_id ? authors.get(post.user_id) : "-"}
              </TableCell>
              <TableCell align="center" sx={{ color: "text.secondary" }}>
                {formatDate(post.created_at)}
              </TableCell>
              <TableCell align="center" sx={{ ...hideOnMobile, color: "text.secondary" }}>
                {post.view_count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BoardPagination basePath={basePath} page={page} totalPages={Math.ceil(total / PAGE_SIZE)} />
    </>
  )
}
