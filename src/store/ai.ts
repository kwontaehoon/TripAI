import { atom } from 'jotai'

// ai 페이지에서 지역 선택
export const modalUiStateAtom = atom({
    aiInput: false
})

// localstorage 전역 상태 관리
export const aiResponseAtom = atom([])

// intro modal
export const introModalAtom = atom(false)

// loading modal
export const loadingModalAtom = atom({
    isOpen: false,
    message: ""
})

// 비밀번호 변경 modal
export const passwordChangeAtom = atom(false)

// 계정 삭제 modal
export const accountDeleteAtom = atom({
    isOpen: false,
    uid: null,
    email: null
})

// session
export const sessionAtom = atom()

// userInfo
export const userInfoAtom = atom()