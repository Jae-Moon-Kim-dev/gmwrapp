import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 멤버 역할 변경
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { roleMembers } = await request.json()

    if (!roleMembers || !Array.isArray(roleMembers)) {
      return NextResponse.json({ success: false, message: '잘못된 요청입니다.' }, { status: 400 })
    }

    const updates = roleMembers.map((member: { id: string; role_id: number }) =>
      supabase
        .from('wr_member')
        .update({ role_id: member.role_id })
        .eq('id', member.id)
    )

    await Promise.all(updates)

    return NextResponse.json({ success: true, message: '역할이 변경되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '역할 변경 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
