import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const STATIC_META: Record<string, { label: string; value: string }[]> = {
  visible: [
    { label: '표시', value: 'Y' },
    { label: '숨김', value: 'N' },
  ],
  menuType: [
    { label: '메뉴', value: 'menu' },
    { label: '게시판', value: 'board' },
    { label: '페이지', value: 'page' },
    { label: '링크', value: 'link' },
  ],
}

// 공통 메타 데이터 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (!type) {
      return NextResponse.json({ success: false, message: 'type 파라미터가 필요합니다.' }, { status: 400 })
    }

    // 정적 메타 데이터 반환
    if (STATIC_META[type]) {
      return NextResponse.json({ success: true, data: STATIC_META[type] })
    }

    // wr_meta 테이블에서 동적 조회
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('wr_meta')
      .select('meta_key, meta_value')
      .eq('meta_type', type)

    if (error) throw error

    const result = (data ?? []).map((item) => ({
      label: item.meta_value,
      value: item.meta_key,
    }))

    return NextResponse.json({ success: true, data: result })
  } catch {
    return NextResponse.json(
      { success: false, message: '메타 데이터 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
