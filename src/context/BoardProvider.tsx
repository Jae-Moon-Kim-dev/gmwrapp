"use client"

import React, { createContext, ReactNode, useState } from "react"

export const BoardContext = createContext<{
    isModify: boolean,
    setModify: React.Dispatch<React.SetStateAction<boolean>>,
    boardId: string,
    setBoardId: React.Dispatch<React.SetStateAction<string>>,
}>({
    isModify: false,
    setModify: () => {},
    boardId: '',
    setBoardId: () => {},
});

const BoardProvider = ({ children }: { children: ReactNode }) => {
    const [isModify, setModify] = useState<boolean>(false);
    const [boardId, setBoardId] = useState<string>('');

    return (
        <BoardContext.Provider 
            value={{ 
                isModify, 
                setModify,
                boardId,
                setBoardId,
            }}>
            {children}
        </BoardContext.Provider>
    );
};

export default BoardProvider;