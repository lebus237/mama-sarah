import { MultiSelect, Select } from '@mantine/core'

const styles = {
   defaultProps: {
      radius: 'sm',
      size: 'sm',
   },
   styles: {
      label: {
         fontSize: 'var(--mantine-font-size-sm)',
         fontWeight: '300',
         // fontStyle: 'italic',
         padding: '2px 0',
         color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-1))',
      },
      input: {
         'color': 'light-dark(#343a40, var(--mantine-color-dark-0))',
         '&:focus': {
            borderColor: 'var(--mantine-color-orange-5)',
            backgroundColor: 'light-dark(#ffffff, var(--mantine-color-dark-5))',
         },
      },
      dropdown: {
         boxShadow: 'var(--mantine-shadow-lg)',
         backgroundColor: 'light-dark(var(--mantine-color-gray-1)), var(--mantine-color-dark-6))',
         border: 'light-dark(1px solid #dee2e6, 1px solid var(--mantine-color-dark-4))',
      },
      option: {
         'color': 'light-dark(#343a40, var(--mantine-color-dark-0))',

         '&[data-hovered]': {
            backgroundColor: 'light-dark(rgba(255, 140, 26, 0.05), rgba(255, 140, 26, 0.1))',
         },
      },
   },
}

export const SelectComponent = Select.extend(styles)

export const MultiSelectComponent = MultiSelect.extend(styles)
