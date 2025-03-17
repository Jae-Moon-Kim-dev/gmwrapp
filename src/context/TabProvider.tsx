"use client"

import { initTermAgree, TabId, TermAgree } from "@/app/types/user/common";
import React, { createContext, ReactNode, RefObject, useRef, useState } from "react"

export const TabContext = createContext<{
    tab: TabId,
    setTab: React.Dispatch<React.SetStateAction<TabId>>,
    agree: TermAgree,
    setAgree: React.Dispatch<React.SetStateAction<TermAgree>>,
}>({
    tab: "agree",
    setTab: () => {},
    agree: initTermAgree,
    setAgree: () => {},
});

const TabProvider = ({ children }: { children: ReactNode }) => {
    const [ tab, setTab ] = useState<TabId>("agree");
    const [ agree, setAgree ] = useState<TermAgree>(initTermAgree);

    return (
        <TabContext.Provider 
            value={{ 
                tab, 
                setTab,
                agree, 
                setAgree,  
            }}>
            {children}
        </TabContext.Provider>
    );
};

export default TabProvider;