import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json(
        { success: false, message: '로그아웃 중 오류가 발생하였습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: '정상적으로 로그아웃 되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '로그아웃 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
