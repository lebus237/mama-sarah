import { useModalState } from './use-modal-state'

export const useModals = () => {
   //keyof typeof ModalsMap
   const { closeAllModals, openModal, closeModal, modals } =
      useModalState<Extract<string, string>>()

   return { closeAllModals, openModal, closeModal, modals }
}
