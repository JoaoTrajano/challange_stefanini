import { create } from 'zustand'

export type ModalsType =
  | 'RegisterPerson'
  | 'EditePerson'
  | 'DeletePerson'
  | 'PersonDetails'

type ModalStore = {
  isOpen: boolean
  modal: ModalsType | null
  openModal: (modal: ModalsType) => void
  closeModal: () => void
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  modal: null,
  openModal: (modal) => set({ isOpen: true, modal }),
  closeModal: () => set({ isOpen: false, modal: null }),
}))
