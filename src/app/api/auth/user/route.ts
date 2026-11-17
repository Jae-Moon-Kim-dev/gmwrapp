import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json(
        { success: false, code: 'AUTH_ERROR', message: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    const { data: memberData } = await supabase
      .from('wr_member')
      .select('role_id')
      .eq('id', user.id)
      .single()

    const userData = {
      id: user.id,
      name: user.user_metadata?.name ?? '',
      email: user.email,
      role_id: memberData?.role_id ?? 1,
    }

    return NextResponse.json({ success: true, data: userData })
  } catch {
    return NextResponse.json(
      { success: false, message: '사용자 정보 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
