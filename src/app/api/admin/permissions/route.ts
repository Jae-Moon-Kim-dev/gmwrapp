import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 메뉴-역할 권한 목록 조회
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    // 모든 메뉴와 역할의 조합 조회
    const [menusResult, rolesResult, menuRolesResult] = await Promise.all([
      supabase.from('wr_menu').select('menu_id, menu_name, parent_menu_id').order('menu_order'),
      supabase.from('wr_role').select('role_id, role_name'),
      supabase.from('wr_menu_role').select('*'),
    ])

    if (menusResult.error) throw menusResult.error
    if (rolesResult.error) throw rolesResult.error
    if (menuRolesResult.error) throw menuRolesResult.error

    const menus = menusResult.data ?? []
    const roles = rolesResult.data ?? []
    const menuRoles = menuRolesResult.data ?? []

    // 메뉴-역할 조합 생성
    const result = menus.flatMap((menu) =>
      roles.map((role) => {
        const existing = menuRoles.find(
          (mr) => mr.menu_id === menu.menu_id && mr.role_id === role.role_id
        )
        const parentMenu = menus.find((m) => m.menu_id === menu.parent_menu_id)

        return {
          parent_menu_id: menu.parent_menu_id ?? null,
          parent_menu_name: parentMenu?.menu_name ?? '',
          menu_id: menu.menu_id,
          menu_name: menu.menu_name,
          role_id: role.role_id,
          role_name: role.role_name,
          role_yn: existing ? 'Y' : 'N',
          read_yn: existing?.read_yn ?? 'N',
          write_yn: existing?.write_yn ?? 'N',
          admin_yn: existing?.admin_yn ?? 'N',
          write_disable_yn: 'N',
          admin_disable_yn: 'N',
        }
      })
    )

    return NextResponse.json({ success: true, data: result })
  } catch {
    return NextResponse.json(
      { success: false, message: '권한 목록 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
