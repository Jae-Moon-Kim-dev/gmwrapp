"use client"

// 모바일에서 관리자 메뉴를 여는 버튼 + 왼쪽 Drawer
import { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import MenuIcon from "@mui/icons-material/Menu"
import AdminNav from "./AdminNav"

export default function AdminMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ display: { md: "none" } }}>
      <IconButton color="inherit" edge="start" aria-label="관리자 메뉴 열기" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240, pt: 2 }}>
          <AdminNav onNavigate={() => setOpen(false)} />
        </Box>
      </Drawer>
    </Box>
  )
}
