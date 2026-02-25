import DeleteConfirmationModal from './app/DeleteConfirmationModal'
import { useModals } from '../../../hooks'
import SearchModuleModal from './module'
import ChangeLanguageModal from './ChangeLanguageModal'
import AppManagerModal from './app/AppManagerModal'

export default function ModalContainer({ modalMaps }: { modalMaps: any }) {
   const { modals, closeModal, closeAllModals } = useModals()

   let allModals = {
      DELETE_CONFIRMATION_MODAL: DeleteConfirmationModal,
      CHANGE_LANGUAGE_MODAL: ChangeLanguageModal,
      APP_MANAGER_MODAL: AppManagerModal,
      SEARCH_MODULE_MODAL: SearchModuleModal,
      ...modalMaps,
   }

   return (modals?.modals || []).map(({ type, modalProps, visible }: any, index: number) => {
      const ModalComponent = (allModals as any)[type]

      const hideCurrentModal = () => closeModal(type)

      return (
         <ModalComponent
            key={`${type}-${index}`}
            modalProps={{ ...modalProps }}
            onClose={hideCurrentModal}
            hideAllModals={closeAllModals}
            open={visible}
         />
      )
   })
}
