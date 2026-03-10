"use client";

import { insertBoard, uploadFile } from '@/app/api/common/common';
import { BoardUpdateData, ComPageProps } from '@/app/types/common/board';
import { HookCallback } from '@/app/types/common/editor';
import { userStore } from '@/stores/userStore';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import DropzoneFileupload from './DropzoneFileupload';
import InputField from './board/InputField';
import Swal from 'sweetalert2';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const ComEditBoard = ({
  menuId,
  boardData,
}: ComPageProps) => {
  const TuiEditor = dynamic(() => import('@/components/common/TuiEditor'), {
    ssr: false,
  });

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const editRef = useRef<Editor>(null);
  const user = userStore((state) => state.user);

  

  const boardForm = useForm<BoardUpdateData>({
    defaultValues: {
      menu_id: "",
      board_id: "",
      board_type: "board",
      board_title: "",
      board_content: "",
      board_files: [],
      noti_yn: "N",
      admin_yn: "N",
      board_user_name: "",
      board_user_date: "",
      like_count: "",
      views_count: "",
    },
  });

  const { control, setValue, trigger, clearErrors, reset, formState: { errors } } = boardForm;

  // 상세에서 넘어온 boardData 로 폼 초기값 세팅
  useEffect(() => {
    if (boardData) {
      reset({
        menu_id: boardData.menu_id ?? menuId,
        board_id: boardData.board_id,
        board_type: boardData.board_type,
        board_title: boardData.board_title,
        board_content: boardData.board_content,
        board_files: boardData.board_files ?? [],
        noti_yn: boardData.noti_yn,
        admin_yn: boardData.admin_yn,
        board_user_name: boardData.board_user_name,
        board_user_date: boardData.board_user_date,
        like_count: boardData.like_count,
        views_count: boardData.views_count,
      });
    }
  }, [boardData, menuId, reset]);
  
  const handleImage = useCallback(async (blob: File | Blob, getImage: HookCallback) => {
    const formData = new FormData();

    formData.append('file', blob);
    formData.append('type', `${menuId}`);
    const data = await uploadFile(formData);
    getImage(`${process.env.NEXT_PUBLIC_API_DOMAIN}${data}`, formData.get('file')?.toString());
  }, [menuId]);
  
  const chkBoardContent = (content: string) => {
    let cleanContent = content.replace(/<p>\s*<\/p>|<br\s*\/?>|<p><br><\/p>|&nbsp;/gi, '');

    cleanContent = cleanContent.replace(/\s/gi, '');

    return cleanContent;
  }

  const goList = useCallback(() => {
    if ( searchParams ) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('boardId');
      params.delete('mode');
      router.push(`${pathName}?${params.toString()}`);
    }
  }, [pathName, router, searchParams]);

  const handleSaveBoard = useCallback(async () => {
    let content = '' as string | undefined;
    if ( !!editRef ) {
      content = editRef.current?.getInstance().getHTML();
      
      if ( content ) {
        let cleanContent = content.replace(/<p>\s*<\/p>|<br\s*\/?>|<p><br><\/p>|&nbsp;/gi, '');

        cleanContent = cleanContent.replace(/\s/gi, '');

        if ( cleanContent.trim() === '' ) {
          Swal.fire({
            icon : "error",
            text: "내용을 입력하세요.",
            showCloseButton: true
          });
          return;
        }

        setValue('board_content', content);
    }
    clearErrors();
		const isValid = await trigger();

    if ( isValid ) {
        const formData = new FormData();
        const { board_id, board_type, board_title, board_content, board_files, noti_yn, admin_yn } = boardForm.getValues();

        console.log(board_files);

        board_files.forEach(a => {
          formData.append('files[]', a);
        });

        formData.append('menu_id', menuId ?? '');
        formData.append('board_id', board_id);
        formData.append('board_type', board_type);
        formData.append('board_title', board_title);
        formData.append('board_content', board_content);
        formData.append('noti_yn', noti_yn);
        formData.append('admin_yn', admin_yn);

        const result = await insertBoard(formData);

        if ( result ) {
          const params = new URLSearchParams(searchParams?.toString());
          params.delete('boardId');
          params.delete('mode');
          router.push(`${pathName}?${params.toString()}`);
        }
      }
    }

  }, [clearErrors, trigger, setValue, boardForm, menuId, searchParams, router, pathName]);

  useEffect(() => {
    if (errors && Object.values(errors).length > 0) {
      const firstError = Object.values(errors).find(error => !!error);

      if (firstError?.message) {
        Swal.fire({
          icon: "error",
          text: firstError.message as string,
          showCloseButton: true,
        });
      }
    }
  }, [errors]);

  return (
    <>
    <Form className='p-2' >
      <FormProvider {...boardForm}>
        <InputField
          user={user}
        />
      <Controller
        name='board_content'
        control={control}
        render={({
            field: { value },
        }) => (
          <TuiEditor 
            editorRef = {editRef}
            value= { chkBoardContent(value) ? value : '<p><br/></p>'}
            handleImage={(blob: File | Blob, callback: HookCallback) => handleImage(blob, callback)} 
          />
        )}
          />
      <Form.Group as={Row} className='mt-2' >
        <Form.Label as={Col} xs="2" column className="fs-6 fw-bolder">
          파일첨부
        </Form.Label>
        <Col xs="8" >
          <DropzoneFileupload
          />
        </Col>
      </Form.Group>
      </FormProvider>
    </Form>
    <Row className='my-3'>
      <Col xs={{ span: 5 }} className='d-flex justify-content-start' > 
        <Button variant="primary" className='mx-3' onClick={()=> {goList()}} >목록</Button>
      </Col>
      <Col xs={{ span: 5, offset: 2 }} className='d-flex justify-content-end' > 
        <Button variant="primary" className='mx-3' onClick={async ()=> {await handleSaveBoard();}} >등록</Button>
      </Col>
    </Row>
    </>
  );
}

export default ComEditBoard;
