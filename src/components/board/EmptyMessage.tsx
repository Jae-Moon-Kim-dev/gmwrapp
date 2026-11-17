import Typography from "@mui/material/Typography"

export default function EmptyMessage({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ py: 10, textAlign: "center", color: "text.disabled" }}>{children}</Typography>
  )
}
