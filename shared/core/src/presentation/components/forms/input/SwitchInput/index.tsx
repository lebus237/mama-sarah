import { Switch, type SwitchProps, Text } from '@mantine/core'
import { I18nLabel } from '@shared/i18n'

export interface AppSwitchInputType extends SwitchProps {
   name?: any
   value?: any
   label?: any
   onChange?: (props?: any) => void
   errorMessage?: string
}

export default function AppSelectInput(props: AppSwitchInputType) {
   return (
      <Switch
         {...props}
         label={
            <Text fw={200} size="sm" fs="italic">
               <I18nLabel label={props.label} />
            </Text>
         }
         size="md"
         name={props.name}
         checked={props.value}
         onChange={value => props.onChange?.(value.target.checked)}
         error={props.errorMessage ? <I18nLabel label={props.errorMessage} /> : undefined}
      />
   )
}
