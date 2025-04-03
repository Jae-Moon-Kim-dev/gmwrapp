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

export const initInfoData = {
    memName: '',
    gender1: 'M',
    mailID: '',
    mailAddr: '',
    selMailAddr: '',
    celNum1: '010',
    celNum2: '',
    celNum3: '',
    selYear1: '',
    selMonth1: '',
    selDay1: '',
    parentNm: '',
    gender2: 'M',
    selYear2: '',
    selMonth2: '',
    selDay2: '',
    parentCelNum1: '010',
    parentCelNum2: '',
    parentCelNum3: '',
    memId: '',
    memPwd: '',
    memPwdConfirm: '',
};

export type User = {
    id: number,
    name: string,
    email: string,
}

export type Login = {
    id: string,
    pwd: string,
}

export const initLoginData = {
    id: '',
    pwd: ''
}

export type UserStoreState = {
    user: User,
}

export type UserStoreActions = {
    setUser: (loginUser: UserStoreState['user']) => void,
    initUser: () => void,
}

export const initUserData = {
    id: 0,
    name: '',
    email: '',
}

export type UserStore = UserStoreState & UserStoreActions;