import { atom } from 'jotai'

// ai 페이지에서 지역 선택
export const modalUiStateAtom = atom({
    aiInput: false
})

// localstorage
export const aiResponseAtom = atom([])

// intro modal
export const introModalAtom = atom(false)

// loading modal
export const loadingModalAtom = atom({
    isOpen: false,
    message: ""
})