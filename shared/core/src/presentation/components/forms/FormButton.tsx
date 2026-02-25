import { Button, type ButtonProps } from '@mantine/core'
import { I18nLabel } from '@shared/i18n'

export interface FormButtonType extends ButtonProps {
   label?: string
   type?: 'submit' | 'button' | 'reset'
}

function FormButton(props: FormButtonType) {
   return (
      <Button {...props} type={props.type ?? 'submit'} w="100%">
         <I18nLabel label={props.label} />
      </Button>
   )
}

export default FormButton
