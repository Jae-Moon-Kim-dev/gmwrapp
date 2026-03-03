"use client";

import { fetchPage, fetchUserRole, savePage, uploadFile } from '@/app/api/common/common';
import { ComPageProps, Page, Role } from '@/app/types/common/board';
import * as S from '@/styles/common/ViewerComponent.styled';
import { useQueryResult } from '@/hooks/useQueryResult';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { HookCallback } from '@/app/types/common/editor';

const ComPage = ({
  menuId,
  roleId,
}:ComPageProps) => {
  const TuiEditor = dynamic(() => import('@/components/common/TuiEditor'), {
    ssr: false,
  });
  const Viewer = dynamic(
    () => import('@toast-ui/react-editor').then(mod => mod.Viewer),
    { ssr: false }
  );

  const editRef = useRef<Editor>(null);
  const queryClient = useQueryClient();
  const [isModify, setModify] = useState<boolean>(false);

  const { data: userRole } = useQueryResult<Role>(['fetchRoleByUser', menuId, roleId], useCallback(async ({queryKey}) => await fetchUserRole(queryKey[1] as string, queryKey[2] as string), []));
  const { data: item } = useQueryResult<Page>(['fetchPage', menuId], useCallback(async ({queryKey}) => await fetchPage(queryKey[1] as string), []));

  const handleImage = useCallback(async (blob: File | Blob, getImage: HookCallback) => {
    const formData = new FormData();

    formData.append('file', blob);
    formData.append('type', `${menuId}`);
    const data = await uploadFile(formData);
    getImage(`${process.env.NEXT_PUBLIC_API_DOMAIN}${data}`, formData.get('file')?.toString());
  }, [menuId]);

  const updatePageMutation = useMutation({
    mutationFn: useCallback(({menuId, content}: {menuId: string, content: string}) => savePage({menuId, content}), []),
    onSuccess: () => {
      setModify(false);
      queryClient.invalidateQueries({ queryKey: ['fetchPage'] });
    }
  });

  const handleSaveEditor = useCallback(async () => {
    if ( !!menuId && !!editRef ) {
      const content = editRef.current?.getInstance().getHTML();

      if ( content ) {
        let cleanContent = content.replace(/<p>\s*<\/p>|<br\s*\/?>|<p><br><\/p>|&nbsp;/gi, '');

        console.log(cleanContent);

        cleanContent = cleanContent.replace(/\s/gi, '');

        if ( cleanContent.trim() === '' ) {
          Swal.fire({
            icon : "error",
            text: "내용을 입력하세요.",
            showCloseButton: true
          });
          return;
        }

        updatePageMutation.mutate({menuId, content});
      }
    }
  }, [editRef, menuId]);

  return (
    <>
    { isModify ? 
      <TuiEditor 
        editorRef = {editRef}
        value= {item?.board_content ?? '<p></p>'}
        handleImage={(blob: File | Blob, callback: HookCallback) => handleImage(blob, callback)} 
      />
      :
        item && <S.ViewerWrapper><Viewer initialValue={item.board_content} /></S.ViewerWrapper>  
    }
    {
      (userRole && userRole.admin_yn === 'Y') && 
      <div className='d-flex flex-row-reverse my-3'>
        { isModify ? 
        <Button variant="primary" className='mx-3' onClick={handleSaveEditor} >저장</Button>
        :
        <Button variant="primary" className='mx-3' onClick={()=> {setModify(true);}} >수정</Button>
        }
      </div>
    }
    </>
  );
}

export default ComPage;
