import { Modal } from '@mantine/core'

export const ModalComponent = Modal.extend({
   defaultProps: {
      radius: 'lg',
      shadow: 'xl',
   },
   styles: {
      content: {
         backgroundColor: 'light-dark(#ffffff, var(--mantine-color-dark-7))',
      },
      header: {
         backgroundColor: 'light-dark(#ffffff, var(--mantine-color-dark-7))',
         borderBottom: 'light-dark(1px solid #f1f3f4, 1px solid var(--mantine-color-dark-5))',
         paddingBottom: '1rem',
      },
   },
})
