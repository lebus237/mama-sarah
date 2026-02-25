import { NavLink } from '@mantine/core'

export const NavLinkComponent = NavLink.extend({
   styles: {
      root: {
         'color': 'light-dark(#adb5bd, var(--mantine-color-dark-2))',
         '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'light-dark(#ffffff, var(--mantine-color-dark-0))',
         },
         '&[data-active]': {
            'backgroundColor': 'var(--mantine-color-orange-5)',
            'color': '#ffffff',
            '&:hover': {
               backgroundColor: 'var(--mantine-color-orange-6)',
            },
         },
      },
      label: {
         fontWeight: 500,
      },
   },
})
