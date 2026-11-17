"use client"

import Pagination from "@mui/material/Pagination"
import PaginationItem from "@mui/material/PaginationItem"
import NextLink from "@/components/ui/NextLink"

type Props = { basePath: string; page: number; totalPages: number }

// 각 페이지 번호가 링크(?page=2)라서 새로고침·뒤로가기가 자연스럽게 동작합니다.
export default function BoardPagination({ basePath, page, totalPages }: Props) {
  if (totalPages <= 1) return null

  return (
    <Pagination
      page={page}
      count={totalPages}
      color="primary"
      sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      renderItem={(item) => (
        <PaginationItem component={NextLink} href={`${basePath}?page=${item.page}`} {...item} />
      )}
    />
  )
}
