import { Select, type SelectProps } from '@mantine/core'
import { I18nLabel, useTranslate } from '@shared/i18n'
import { EnumHelper } from '../../../../../lib/helpers'

export interface AppEnumInputType extends SelectProps {
   name?: any
   value?: any
   label?: any
   placeholder?: any
   onChange?: (props?: any) => void
   errorMessage?: string
   enum?: any
}

export default function AppEnumInput(props: AppEnumInputType) {
   const { trans } = useTranslate()
   return (
      <Select
         {...props}
         name={props.name}
         value={props.value}
         label={props.label}
         onChange={event => props.onChange?.(event)}
         data={EnumHelper.toList(props.enum).map(item => ({
            value: item.value,
            label: trans(`enum.${item.key?.toLowerCase()}`),
         }))}
         error={props.errorMessage ? <I18nLabel label={props.errorMessage} /> : undefined}
      />
   )
}
