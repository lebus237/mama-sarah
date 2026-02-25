import { Card } from '@mantine/core'

export const CardComponent = Card.extend({
   defaultProps: {
      radius: 'lg',
      padding: 'lg',
   },
   styles: {
      root: {
         backgroundColor: 'light-dark(#ffffff, var(--mantine-color-dark-6))',
         transition: 'background-color 0.2s ease, border-color 0.2s ease',
      },
   },
})
