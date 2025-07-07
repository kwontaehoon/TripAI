import { atom } from 'jotai'

// ai 페이지에서 지역 선택
export const modalUiStateAtom = atom({
    aiInput: false
})

export const aiResponseAtom = atom([])

// intro modal
export const introModalAtom = atom(false)