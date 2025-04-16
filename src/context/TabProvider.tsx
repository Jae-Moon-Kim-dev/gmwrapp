"use client"

import { initInfoData, InfoData, initTermAgree, TabId, TermAgree } from "@/app/types/user/user";
import React, { createContext, ReactNode, useState } from "react"

export const TabContext = createContext<{
    tab: TabId,
    setTab: React.Dispatch<React.SetStateAction<TabId>>,
    agree: TermAgree,
    user: InfoData,
    setUser: React.Dispatch<React.SetStateAction<InfoData>>,
    setAgree: React.Dispatch<React.SetStateAction<TermAgree>>,
}>({
    tab: "agree",
    setTab: () => {},
    agree: initTermAgree,
    setAgree: () => {},
    user: initInfoData,
    setUser: () => {},
});

const TabProvider = ({ children }: { children: ReactNode }) => {
    const [ tab, setTab ] = useState<TabId>("agree");
    const [ agree, setAgree ] = useState<TermAgree>(initTermAgree);
    const [ user, setUser ] = useState<InfoData>(initInfoData);

    return (
        <TabContext.Provider 
            value={{ 
                tab, 
                setTab,
                agree, 
                setAgree,
                user,
                setUser,  
            }}>
            {children}
        </TabContext.Provider>
    );
};

export default TabProvider;