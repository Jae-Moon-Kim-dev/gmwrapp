import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 메뉴 단건 조회 (사이드 메뉴용)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // 해당 메뉴 및 형제/하위 메뉴 조회
    const { data: menu, error } = await supabase
      .from('wr_menu')
      .select('*')
      .eq('menu_id', id)
      .single()

    if (error || !menu) {
      return NextResponse.json({ success: false, message: '메뉴를 찾을 수 없습니다.' }, { status: 404 })
    }

    // 같은 부모의 메뉴들 (사이드 메뉴)
    const { data: siblings } = await supabase
      .from('wr_menu')
      .select('*')
      .eq('parent_menu_id', menu.parent_menu_id ?? 0)
      .eq('visible_yn', 'Y')
      .order('menu_order', { ascending: true })

    const menuData = {
      id: String(menu.menu_id),
      parentId: menu.parent_menu_id ? String(menu.parent_menu_id) : null,
      label: menu.menu_name,
      url: menu.menu_url ?? '',
      menuOrder: menu.menu_order,
      siblings: (siblings ?? []).map((s) => ({
        id: String(s.menu_id),
        parentId: s.parent_menu_id ? String(s.parent_menu_id) : null,
        label: s.menu_name,
        url: s.menu_url ?? '',
        menuOrder: s.menu_order,
      })),
    }

    return NextResponse.json({ success: true, data: menuData })
  } catch {
    return NextResponse.json(
      { success: false, message: '메뉴 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
