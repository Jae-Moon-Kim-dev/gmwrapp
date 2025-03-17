export type TabId = "agree" | "info" | "complete";

export interface TermAgree {
    memAgrAll: boolean,
    memAgr1: boolean,
    memAgr2: boolean,
}

export const initTermAgree = {
    memAgrAll: false,
    memAgr1: false,
    memAgr2: false,
}