import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"

// 목록을 불러오는 동안 보여줄 자리표시
export default function Loading({ rows = 6 }: { rows?: number }) {
  return (
    <Box>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} height={44} />
      ))}
    </Box>
  )
}
