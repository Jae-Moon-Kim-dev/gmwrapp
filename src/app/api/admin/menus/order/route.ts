import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 메뉴 순서 변경
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { datas } = await request.json()

    if (!datas || !Array.isArray(datas)) {
      return NextResponse.json({ success: false, message: '잘못된 요청입니다.' }, { status: 400 })
    }

    const updates = datas.map((item: { menu_id: number; menu_order: number; parent_menu_id: number | null }) =>
      supabase
        .from('wr_menu')
        .update({
          menu_order: item.menu_order,
          parent_menu_id: item.parent_menu_id ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq('menu_id', item.menu_id)
    )

    await Promise.all(updates)

    return NextResponse.json({ success: true, message: '메뉴 순서가 변경되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '메뉴 순서 변경 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
