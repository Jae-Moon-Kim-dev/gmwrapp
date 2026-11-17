import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 메뉴-역할 권한 수정 (upsert)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { menuRoles } = await request.json()

    if (!menuRoles || !Array.isArray(menuRoles)) {
      return NextResponse.json({ success: false, message: '잘못된 요청입니다.' }, { status: 400 })
    }

    // role_yn이 'N'인 경우 삭제, 'Y'인 경우 upsert
    const toDelete = menuRoles.filter((mr) => mr.role_yn === 'N')
    const toUpsert = menuRoles
      .filter((mr) => mr.role_yn === 'Y')
      .map((mr) => ({
        menu_id: mr.menu_id,
        role_id: mr.role_id,
        read_yn: mr.read_yn,
        write_yn: mr.write_yn,
        admin_yn: mr.admin_yn,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      }))

    const operations = []

    if (toDelete.length > 0) {
      for (const item of toDelete) {
        operations.push(
          supabase
            .from('wr_menu_role')
            .delete()
            .eq('menu_id', item.menu_id)
            .eq('role_id', item.role_id)
        )
      }
    }

    if (toUpsert.length > 0) {
      operations.push(
        supabase.from('wr_menu_role').upsert(toUpsert, {
          onConflict: 'menu_id,role_id',
        })
      )
    }

    await Promise.all(operations)

    return NextResponse.json({ success: true, message: '권한이 수정되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '권한 수정 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
