import { Button } from '@mantine/core'

export const ButtonComponent = Button.extend({
   defaultProps: {
      radius: 'sm',
      size: 'sm',
   },
   styles: {
      root: {
         fontWeight: 400,
      },
   },
})
