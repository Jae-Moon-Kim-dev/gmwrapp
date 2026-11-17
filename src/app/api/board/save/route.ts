import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { r2 } from '@/lib/r2'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import path from 'path'

// 게시글 등록/수정
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const formData = await request.formData()
    const menuId = formData.get('menuId') as string
    const boardId = formData.get('boardId') as string | null
    const boardTitle = formData.get('board_title') as string
    const boardContent = formData.get('board_content') as string
    const boardType = formData.get('board_type') as string
    const notiYn = (formData.get('noti_yn') as string) ?? 'N'
    const adminYn = (formData.get('admin_yn') as string) ?? 'N'
    const files = formData.getAll('files') as File[]

    let savedBoardId: number

    if (boardId) {
      // 수정
      const { data, error } = await supabase
        .from('wr_board')
        .update({
          board_title: boardTitle,
          board_content: boardContent,
          board_type: boardType,
          noti_yn: notiYn,
          admin_yn: adminYn,
          updated_at: new Date().toISOString(),
        })
        .eq('board_id', boardId)
        .select('board_id')
        .single()

      if (error) throw error
      savedBoardId = data.board_id
    } else {
      // 등록
      const { data, error } = await supabase
        .from('wr_board')
        .insert({
          menu_id: Number(menuId),
          board_title: boardTitle,
          board_content: boardContent,
          board_type: boardType,
          noti_yn: notiYn,
          admin_yn: adminYn,
          board_user_id: user.id,
        })
        .select('board_id')
        .single()

      if (error) throw error
      savedBoardId = data.board_id
    }

    // 파일 업로드 (Cloudflare R2)
    if (files.length > 0) {
      for (const file of files) {
        const ext = path.extname(file.name)
        const physicalName = `${randomUUID()}${ext}`
        const directory = `board/${menuId}`
        const key = `${directory}/${physicalName}`

        const buffer = Buffer.from(await file.arrayBuffer())
        await r2.send(
          new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
            Key: key,
            Body: buffer,
            ContentType: file.type,
          })
        )

        await supabase.from('wr_file').insert({
          category: 'board',
          board_id: savedBoardId,
          directory,
          physical_name: physicalName,
          actual_name: file.name,
          type: file.type,
          size: file.size,
          user_id: user.id,
        })
      }
    }

    return NextResponse.json({ success: true, data: true })
  } catch {
    return NextResponse.json(
      { success: false, message: '게시글 저장 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
