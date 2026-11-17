"use client"

// MUI 컴포넌트의 component 속성에 Next.js Link를 넘길 때 사용합니다.
// 예) <Button component={NextLink} href="/login">로그인</Button>
// (서버 컴포넌트에서 next/link를 직접 넘기면 에러가 나서 이렇게 감쌉니다)
import Link from "next/link"

export default Link
