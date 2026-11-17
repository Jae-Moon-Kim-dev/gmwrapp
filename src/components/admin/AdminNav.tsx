"use client"

// 관리자 사이드바 메뉴. 현재 주소를 알아야 해서 클라이언트 컴포넌트입니다.
import Link from "next/link"
import { usePathname } from "next/navigation"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import LockIcon from "@mui/icons-material/Lock"
import ArticleIcon from "@mui/icons-material/Article"
import PeopleIcon from "@mui/icons-material/People"
import { ADMIN_NAV, type AdminNavIcon } from "./navItems"

const ICONS: Record<AdminNavIcon, React.ReactNode> = {
  dashboard: <DashboardIcon fontSize="small" />,
  menus: <AccountTreeIcon fontSize="small" />,
  permissions: <LockIcon fontSize="small" />,
  posts: <ArticleIcon fontSize="small" />,
  members: <PeopleIcon fontSize="small" />,
}

export default function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <List component="nav" sx={{ px: 1 }}>
      {ADMIN_NAV.map((item) => {
        // /admin 은 정확히 일치할 때만, 나머지는 하위 주소까지 활성 표시
        const active =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)

        return (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            selected={active}
            onClick={onNavigate}
            sx={{ borderRadius: 1, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{ICONS[item.icon]}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        )
      })}
    </List>
  )
}
