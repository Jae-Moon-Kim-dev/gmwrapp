"use client"

import React, { createContext, ReactNode } from "react"

export const BoardContext = createContext<Record<string, never>>({});

const BoardProvider = ({ children }: { children: ReactNode }) => {
    return (
        <BoardContext.Provider value={{}}>
            {children}
        </BoardContext.Provider>
    );
};

export default BoardProvider;