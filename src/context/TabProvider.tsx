"use client"

import React, { createContext, ReactNode, useState } from "react"

export type TabId = "agree" | "info" | "complete";

export const TabContext = createContext<{
    tab: TabId,
    setTab: React.Dispatch<React.SetStateAction<TabId>>
}>({
    tab: "agree",
    setTab: () => {},
});

const TabProvider = ({ children }: { children: ReactNode }) => {
    const [ tab, setTab ] = useState<TabId>("agree");

    return (
        <TabContext.Provider value={{ tab, setTab }}>
            {children}
        </TabContext.Provider>
    );
};

export default TabProvider;