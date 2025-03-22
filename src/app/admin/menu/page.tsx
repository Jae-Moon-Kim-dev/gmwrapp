"use client";
import { motion } from 'framer-motion';
import { Board, BoardApiData } from '@/app/types/prayerhouse/prayerHouse';
import { ColumnDef } from '@tanstack/react-table';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Menu = () => {

  const initialData: Board = {
      boardNo: 0,
      boardTitle: '',
      boardUserId: 0,
      viewCount: 0,
    };
  const [board, setBoard] = useState<Board[]>([initialData]);

  const fetchBoards = async ():Promise<Board[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/board/all`);
    const { data } = await response.json();
    console.log(data);
    let no = 0;
    return data.map((a:BoardApiData)=>{
      no += 1;
      return {
        boardNo: no,
        boardTitle: decodeURIComponent(a.board_title),
        boardUserId: a.board_user_id,
        viewCount: a.views_count,
      };
    });
  }

  const columns: ColumnDef<Board>[] = [
    {
      accessorKey: 'boardNo',
      id: 'boardNo', 
      header: '번호',
    },
    {
      accessorKey: 'boardTitle',
      id: 'boardTitle',
      header: '제목',
    },
    {
      accessorKey: 'boardUserId',
      id: 'boardUserId',
      header: '등록자',
    },
    {
      accessorKey: 'viewCount',
      id: 'viewCount',
      header: '조회수',
    },
  ];

  useEffect(()=>{
    const fetchBoardsData = async () => {
      const fetchedBoards = await fetchBoards();
      setBoard(fetchedBoards);
    };

    // fetchBoardsData 호출
    fetchBoardsData();
  },[]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container" >
        <ol className="breadcrumb mt-4">
          <li className="breadcrumb-item"><Link href="/" >Home</Link></li>
          <li className="breadcrumb-item"><Link href="/admin/menu/">메뉴 관리</Link></li>
          <li className="breadcrumb-item active">메뉴 관리</li>
        </ol>
        <hr/>
        <div>
        <Box sx={{ minHeight: 352, minWidth: 250 }}>
          <SimpleTreeView>
            <TreeItem itemId="grid" label="Data Grid">
              <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
              <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
              <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
            </TreeItem>
            <TreeItem itemId="pickers" label="Date and Time Pickers">
              <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
              <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
            </TreeItem>
            <TreeItem itemId="charts" label="Charts">
              <TreeItem itemId="charts-community" label="@mui/x-charts" />
            </TreeItem>
            <TreeItem itemId="tree-view" label="Tree View">
              <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
            </TreeItem>
          </SimpleTreeView>
        </Box>
        </div>
        <div className="col-lg-12 text-lg-end text-center" >
          <button type="button" className="btn btn-outline-dark btn-sm mb-4 justify-content-end">글쓰기</button>
        </div>
      </div>
    </motion.div>
  );
}

export default Menu;
