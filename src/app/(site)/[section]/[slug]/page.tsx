import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import Container from "@mui/material/Container"
import { getMenuByPath, getMenuTree, type MenuType } from "@/lib/menus"
import PageHeader from "@/components/board/PageHeader"
import BoardList from "@/components/board/BoardList"
import PageContent from "@/components/board/PageContent"
import Loading from "@/components/board/Loading"

// 메뉴 주소 하나가 이 파일 하나로 처리됩니다: /about/intro, /community/free ...
// 메뉴 목록으로 주소를 미리 만들어 두고, 본문(로그인 권한에 따라 달라짐)만 요청 시 불러옵니다.

export async function generateStaticParams() {
  const tree = await getMenuTree()
  return tree.flatMap((group) =>
    group.children.map((menu) => ({ section: group.slug!, slug: menu.slug! }))
  )
}

export async function generateMetadata({ params }: PageProps<"/[section]/[slug]">): Promise<Metadata> {
  const { section, slug } = await params
  const found = await getMenuByPath(section, slug)
  return { title: found?.menu.name }
}

export default async function MenuPage({ params, searchParams }: PageProps<"/[section]/[slug]">) {
  const { section, slug } = await params
  const found = await getMenuByPath(section, slug)
  if (!found) notFound()

  const { group, menu } = found
  const basePath = `/${section}/${slug}`

  return (
    <>
      <PageHeader group={group.name} title={menu.name} />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Suspense fallback={<Loading />}>
          <MenuBody
            type={menu.menu_type as MenuType}
            menuId={menu.id}
            basePath={basePath}
            searchParams={searchParams}
          />
        </Suspense>
      </Container>
    </>
  )
}

async function MenuBody({
  type,
  menuId,
  basePath,
  searchParams,
}: {
  type: MenuType
  menuId: number
  basePath: string
  searchParams: PageProps<"/[section]/[slug]">["searchParams"]
}) {
  if (type === "page") {
    return <PageContent menuId={menuId} />
  }

  const page = Math.max(1, Number((await searchParams).page) || 1)

  // TODO: gallery(사진 앨범), sermon(설교 영상)은 전용 화면으로 바꿀 예정. 지금은 목록으로 표시.
  return <BoardList menuId={menuId} basePath={basePath} page={page} />
}
