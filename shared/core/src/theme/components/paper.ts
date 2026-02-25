import { Paper } from '@mantine/core'

export const PaperComponent = Paper.extend({
   defaultProps: {
      radius: 'md',
      shadow: 'sm',
   },
   styles: {
      root: {
         backgroundColor: 'light-dark(#ffffff, var(--mantine-color-dark-6))',
         border: 'light-dark(1px solid #f1f3f4, 1px solid var(--mantine-color-dark-5))',
      },
   },
})
