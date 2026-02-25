import { useDispatch, useSelector } from 'react-redux'
import { modalSlice } from '../state/modal.store'

const action = modalSlice.actions
export interface OpenModalProps<T> {
   type: T
   modalProps?: any
}

export const useModalState = <T>() => {
   const dispatch = useDispatch()
   const modals = useSelector((state: any) => state.modals)

   const openModal: (props: OpenModalProps<T>) => void = ({
      type,
      modalProps,
   }: OpenModalProps<T>) =>
      dispatch(action.showModal({ type: type as string, modalProps: modalProps }))

   const closeModal = (modalType: T) => dispatch(action.hideModal(modalType as string))

   const closeAllModals = () => dispatch(action.hideAllModals())

   return { modals, openModal, closeModal, closeAllModals }
}
