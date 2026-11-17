import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'

// 멤버 탈퇴 처리
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { deleteMembers } = await request.json()

    if (!deleteMembers || !Array.isArray(deleteMembers)) {
      return NextResponse.json({ success: false, message: '잘못된 요청입니다.' }, { status: 400 })
    }

    // service role로 auth.users 삭제 (CASCADE로 wr_member도 자동 삭제)
    const serviceClient = await createServiceClient()

    const deletions = deleteMembers.map((member: { id: string }) =>
      serviceClient.auth.admin.deleteUser(member.id)
    )

    await Promise.all(deletions)

    return NextResponse.json({ success: true, message: '회원이 탈퇴 처리되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '회원 탈퇴 처리 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
