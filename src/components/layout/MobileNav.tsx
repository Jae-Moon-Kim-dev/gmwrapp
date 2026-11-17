"use client"

import { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import MenuIcon from "@mui/icons-material/Menu"
import NextLink from "@/components/ui/NextLink"
import type { MenuGroup } from "@/lib/menus"

// 모바일 햄버거 메뉴 (오른쪽에서 열리는 Drawer)
export default function MobileNav({ menus }: { menus: MenuGroup[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ display: { md: "none" } }}>
      <IconButton color="inherit" aria-label="메뉴 열기" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260 }} role="navigation">
          {menus.map((group) => (
            <List
              key={group.id}
              dense
              subheader={
                <ListSubheader sx={{ fontWeight: 700, color: "primary.main" }}>{group.name}</ListSubheader>
              }
            >
              {group.children.map((menu) => (
                <ListItemButton
                  key={menu.id}
                  component={NextLink}
                  href={menu.url ?? "#"}
                  onClick={() => setOpen(false)}
                  sx={{ pl: 3 }}
                >
                  <ListItemText primary={menu.name} />
                </ListItemButton>
              ))}
            </List>
          ))}
        </Box>
      </Drawer>
    </Box>
  )
}
