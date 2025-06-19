"use client";

import { fetchPage, savePage, uploadFile } from '@/app/api/common/common';
import { Page } from '@/app/types/common/board';
import { useQueryResult } from '@/hooks/useQueryResult';
import { menuStore } from '@/stores/userStore';
import { Editor } from '@toast-ui/react-editor';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Breadcrumb, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Information = () => {
  const TuiEditor = dynamic(() => import('@/components/common/TuiEditor'), {
    ssr: false,
  });
  const Viewer = dynamic(
    () => import('@toast-ui/react-editor').then(mod => mod.Viewer),
    { ssr: false }
  );

  const menu = menuStore(state => state.menu);
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuId = searchParams?.get("menuId");
  const editRef = useRef<Editor>(null);
  const [isModify, setModify] = useState<boolean>(false);
  const { paths, pathId, url, label } = menu;

  const { data: item } = useQueryResult<Page>(['fetchPage', menuId], useCallback(async ({queryKey}) => fetchPage(queryKey[1] as string), []));

  const nextPage = (url: string) => {
    router.push(url);
  };

  const pathNode = () => {

    const pathNames = paths.split(' > ');
    const pathIds = pathId.split(' > ');

    return pathNames.map((a, idx) => (<Breadcrumb.Item key={`path_child_${pathIds[idx]}`} onClick={() => {nextPage(url);}} >{a}</Breadcrumb.Item>));
  }

  const handleImage = useCallback(async (blob: File, getImage: typeof Function) => {
    const formData = new FormData();

    formData.append('file', blob);
    formData.append('type', `${menuId}`);
    const data = await uploadFile(formData);
    getImage(`${process.env.NEXT_PUBLIC_API_DOMAIN}${data}`, blob.name);
  }, [menuId]);

  const handleSaveEditor = useCallback(async () => {
    if ( !!menuId && !!editRef ) {
      console.log(editRef.current?.getInstance().getHTML());
      console.log(menuId);
      const content = editRef.current?.getInstance().getHTML();

      let cleanContent = content.replace(/<p>\s*<\/p>|<br\s*\/?>|&nbsp;/gi, '');

      cleanContent = cleanContent.replace(/\s/gi, '');

      if ( cleanContent.trim() === '' ) {
        Swal.fire({
          icon : "error",
          text: "내용을 입력하세요.",
          showCloseButton: true
        });
        return;
      }

      const result = await savePage(menuId, content);
      if( result ) setModify(false);
    }
  }, [editRef, menuId]);

  useEffect(()=>{
    
  },[]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Breadcrumb key={`path_${label}`} className='mt-3' >
          <Breadcrumb.Item key={'path_home'} >Home</Breadcrumb.Item>
          { menu && pathNode() }
        </Breadcrumb>
        <hr/>
        { isModify ? 
        <TuiEditor 
          editorRef = {editRef}
          value= {item?.board_content}
          handleImage={(blob: File, callback: typeof Function) => handleImage(blob, callback)} 
        />
        :
          item && <Viewer initialValue={item.board_content} /> 
        }
        <div className='d-flex flex-row-reverse my-3'>
          { isModify ? 
          <Button variant="primary" className='mx-3' onClick={handleSaveEditor} >저장</Button>
          :
          <Button variant="primary" className='mx-3' onClick={()=> {setModify(true);}} >수정</Button>
          }
        </div>
      </Container>
    </motion.div>
  );
}

export default Information;
