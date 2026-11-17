import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 메뉴 목록 조회 (재귀적으로 트리 구조)
export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('wr_menu')
      .select('*')
      .order('menu_order', { ascending: true })

    if (error) throw error

    const buildTree = (items: typeof data, parentId: number | null = null): typeof data => {
      return items
        .filter((item) => item.parent_menu_id === parentId)
        .map((item) => ({
          ...item,
          children: buildTree(items, item.menu_id),
        }))
    }

    const menuTree = buildTree(data ?? [])

    return NextResponse.json({ success: true, data: menuTree })
  } catch {
    return NextResponse.json(
      { success: false, message: '메뉴 목록 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}

// 메뉴 등록
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const body = await request.json()
    const { parent_menu_id, menu_type, menu_name, menu_url, visible_yn } = body

    const { error } = await supabase.from('wr_menu').insert({
      parent_menu_id: parent_menu_id ?? null,
      menu_type,
      menu_name,
      menu_url,
      visible_yn: visible_yn ?? 'Y',
      user_id: user.id,
    })

    if (error) throw error

    return NextResponse.json({ success: true, message: '메뉴가 등록되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '메뉴 등록 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
