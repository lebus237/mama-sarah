import { Tabs } from '@mantine/core'

export const TabsComponent = Tabs.extend({
   styles: {
      tab: {
         'fontWeight': 500,
         'color': 'light-dark(#6c757d, var(--mantine-color-dark-2))',
         '&[data-active]': {
            color: 'var(--mantine-color-orange-5)',
            borderColor: 'var(--mantine-color-orange-5)',
         },
         '&:hover': {
            color: 'light-dark(#343a40, var(--mantine-color-dark-0))',
         },
      },
      panel: {
         backgroundColor: 'light-dark(#ffffff, var(--mantine-color-dark-6))',
      },
   },
})
