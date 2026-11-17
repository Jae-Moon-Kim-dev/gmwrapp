import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 공개 메뉴 목록 조회 (트리 구조)
export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('wr_menu')
      .select('*')
      .eq('visible_yn', 'Y')
      .order('menu_order', { ascending: true })

    if (error) throw error

    const buildTree = (items: typeof data, parentId: number | null = null): typeof data => {
      return items
        .filter((item) => item.parent_menu_id === parentId)
        .map((item) => ({
          id: String(item.menu_id),
          parentId: item.parent_menu_id ? String(item.parent_menu_id) : null,
          label: item.menu_name,
          url: item.menu_url ?? '',
          menuOrder: item.menu_order,
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
