import { type InputProps, NumberInput, PasswordInput, Textarea, TextInput } from '@mantine/core'
import { I18nLabel, useTranslate } from '@shared/i18n'

export interface TextInputType extends InputProps {
   name?: any
   value?: any
   label?: any
   placeholder?: any
   onChange?: (props?: any) => void
   inputType?: 'text' | 'password' | 'textarea' | 'number'
   errorMessage?: any
   onBlur?: any
   component?: any
   onKeyDown?: any
   minRows?: number
   autoSize?: boolean
}

export default function AppInput({ name, ...props }: TextInputType) {
   const { trans } = useTranslate()

   let Component

   switch (props.inputType) {
      case 'number':
         Component = NumberInput
         break
      case 'password':
         Component = PasswordInput
         break
      case 'textarea':
         Component = Textarea
         break
      default:
         Component = TextInput
   }

   return (
      // @ts-ignore
      <Component
         {...props}
         name={name}
         value={props.value}
         label={trans(props.label)}
         onChange={props.onChange}
         placeholder={trans(props.placeholder)}
         variant={props.variant ?? 'default'}
         error={props.errorMessage ? <I18nLabel label={props.errorMessage} /> : undefined}
      />
   )
}
