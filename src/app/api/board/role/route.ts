import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 사용자의 메뉴 권한 조회
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { menuId, roleId } = await request.json()

    const { data, error } = await supabase
      .from('wr_menu_role')
      .select('menu_id, role_id, read_yn, write_yn, admin_yn')
      .eq('menu_id', menuId)
      .eq('role_id', roleId)
      .single()

    if (error || !data) {
      return NextResponse.json({
        success: true,
        data: {
          menu_id: Number(menuId),
          role_id: Number(roleId),
          read_yn: 'N',
          write_yn: 'N',
          admin_yn: 'N',
        },
      })
    }

    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json(
      { success: false, message: '권한 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
