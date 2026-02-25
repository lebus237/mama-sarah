import { TextInput, NumberInput, Textarea, PasswordInput } from '@mantine/core'

const styles = {
   defaultProps: {
      radius: 'sm',
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
         'fontSize': 'var(--mantine-font-size-sm)',
         'paddingBlock': '0px',

         '&:focus': {
            borderColor: 'var(--mantine-primary-color-2)',
            backgroundColor: 'light-dark(#ffffff, var(--mantine-color-dark-5))',
         },
         '&::placeholder': {
            fontWeight: '200',
            fontStyle: 'italic',
         },
      },
      error: {
         fontSize: 'var(--mantine-font-size-sm)',
         fontWeight: '200',
         fontStyle: 'italic',
         padding: '0',
      },
   },
}

export const TextInputComponent = TextInput.extend(styles)

export const NumberInputComponent = NumberInput.extend(styles)

export const TextareaComponent = Textarea.extend(styles)

export const PasswordInputComponent = PasswordInput.extend(styles)
