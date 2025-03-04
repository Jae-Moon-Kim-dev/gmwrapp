"use client";
import { motion } from 'framer-motion';
import { Board, BoardApiData } from '@/app/types/prayerhouse/prayerHouse';
import { ColumnDef } from '@tanstack/react-table';
import Table from '@/components/common/Table';
import { useEffect, useState } from 'react';

const Prayerhouse = () => {

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
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">교회소개</a></li>
          <li className="breadcrumb-item active">능력기도원</li>
        </ol>
        <hr/>
        {/* <table className="table table-hover mt-4">
        <thead>
        {tanstackTable.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
          <tr>
            <td>4</td>
            <td>길...</td>
            <td>송인철</td>
            <td>2008.07.15</td>
            <td>3665</td>
          </tr>
        </tbody>
      </table> */}
      <Table<Board> columns={columns} data={board} />
      <div className="col-lg-12 text-lg-end text-center" >
        <button type="button" className="btn btn-outline-dark btn-sm mb-4 justify-content-end">글쓰기</button>
      </div>
      </div>
    </motion.div>
  );
}

export default Prayerhouse;
