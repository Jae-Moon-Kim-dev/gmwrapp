"use client"

import { createTheme } from "@mui/material/styles"

// 교회 홈페이지 테마 - 색상, 폰트, 컴포넌트 기본 모양을 여기서 정합니다.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      light: "#3a5f8f",
      main: "#2c4a72",
      dark: "#142338",
      contrastText: "#fff",
    },
    secondary: {
      main: "#c8963e", // 포인트 금색
      contrastText: "#fff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    // 하위 페이지 상단 띠 등 연한 배경
    brand: {
      soft: "#f2f6fb",
    },
  },
  typography: {
    fontFamily: 'var(--font-nanum), "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { wordBreak: "keep-all" },
        a: { color: "inherit", textDecoration: "none" },
      },
    },
  },
})

export default theme

// palette.brand 타입 추가
declare module "@mui/material/styles" {
  interface Palette {
    brand: { soft: string }
  }
  interface PaletteOptions {
    brand?: { soft: string }
  }
}
