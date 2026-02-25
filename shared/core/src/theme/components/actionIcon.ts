import { ActionIcon } from '@mantine/core'

export const ActionIconComponent = ActionIcon.extend({
   defaultProps: {
      radius: 'sm',
   },
   styles: {
      root: {
         '&[data-variant="light"]': {
            '&:hover': {
               backgroundColor: 'light-dark(rgba(255, 140, 26, 0.1), rgba(255, 140, 26, 0.15))',
            },
         },
         '&[data-variant="subtle"]': {
            'color': 'light-dark(#6c757d, var(--mantine-color-dark-1))',
            '&:hover': {
               backgroundColor: 'light-dark(#f8f9fa, var(--mantine-color-dark-5))',
            },
         },
      },
   },
})
