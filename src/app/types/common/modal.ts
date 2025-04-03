import { ReactNode } from "react";

export interface ModalConfig {
    header?: ReactNode, 
    body?: ReactNode,
    close_label?: string,
    modalShow?: boolean,
}