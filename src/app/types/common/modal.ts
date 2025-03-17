import { ReactNode } from "react";

export interface ModalConfig {
    headerContent?: ReactNode, 
    bodyContent?: ReactNode,
    closeLabel?: string,
}