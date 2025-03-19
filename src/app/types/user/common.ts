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

export interface IDate {
    year?: string, 
    month?: string
}

export const initDay = [{
    label: '일', value: '' 
}];

export type InfoData = {
    memName: string,
    gender1: string,
    mailID: string,
    mailAddr: string,
    selMailAddr: string,
    celNum1: string,
    celNum2: string,
    celNum3: string,
    selYear1: string,
    selMonth1: string,
    selDay1: string,
    parentNm: string,
    gender2: string,
    selYear2: string,
    selMonth2: string,
    selDay2: string,
    parentCelNum1: string,
    parentCelNum2: string,
    parentCelNum3: string,
    memId: string,
    memPwd: string,
    memPwdConfirm: string,
}