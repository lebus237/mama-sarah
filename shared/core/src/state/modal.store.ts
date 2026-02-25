import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Modal {
   type: string
   modalProps: any
   visible: boolean
}

interface ModalState {
   modals: Modal[]
}

const initialState: ModalState = {
   modals: [],
}

export const modalSlice = createSlice({
   name: 'modals',
   initialState,
   reducers: {
      showModal: (state, action: PayloadAction<{ type: string; modalProps?: any }>) => {
         const { type, modalProps } = action.payload

         let filtered = state.modals.filter(modal => modal.type !== type)
         filtered.push({ type, modalProps, visible: true })

         state.modals = filtered
      },
      hideModal: (state, action: PayloadAction<string>) => {
         state.modals = state.modals.filter(modal => modal.type !== action.payload)
      },
      hideAllModals: state => {
         state.modals = []
      },
   },
})

export const {
   showModal,
   hideModal,
   hideAllModals,
}: {
   showModal: any
   hideModal: any
   hideAllModals: any
} = modalSlice.actions
