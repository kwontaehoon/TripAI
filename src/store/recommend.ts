import { atom } from 'jotai'

export const modalAbsoluteUiStateAtom = atom(Array.from({ length: 3 }, () => false))
