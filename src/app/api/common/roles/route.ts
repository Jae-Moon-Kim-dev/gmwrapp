import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 역할 목록 조회 (select용 - label/value 형태)
export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('wr_role')
      .select('role_id, role_name')
      .order('role_id', { ascending: true })

    if (error) throw error

    const result = (data ?? []).map((item) => ({
      label: item.role_name,
      value: String(item.role_id),
    }))

    return NextResponse.json({ success: true, data: result })
  } catch {
    return NextResponse.json(
      { success: false, message: '역할 목록 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
