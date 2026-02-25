import { DatePickerInput, DateInput } from '@mantine/dates'

const styles = {
   defaultProps: {},
   styles: {
      wrapper: {
         height: '40px',
      },
      input: {
         height: '40px',
      },
      label: {
         fontSize: 'var(--mantine-font-size-sm)',
         fontWeight: '300',
         // fontStyle: 'italic',
         padding: '2px 0',
         color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-1))',
      },
   },
}

export const DatePickerInputComponent = DatePickerInput.extend(styles)
export const DateInputComponent = DateInput.extend(styles)
