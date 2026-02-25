import { DatePickerInput, type DatePickerInputProps } from '@mantine/dates'
import { I18nLabel, useTranslate } from '@shared/i18n'
import { IconCalendarWeek } from '@tabler/icons-react'
import React from 'react'

export type DateInputType = DatePickerInputProps & {
   value?: any
   placeholder?: string
   name: string
   label?: string
   onChange?: (props?: any) => void
   errorMessage?: any
}

export const DateInput: React.FC<DateInputType> = props => {
   const { trans } = useTranslate()
   return (
      <DatePickerInput
         rightSection={<IconCalendarWeek />}
         popoverProps={{ position: 'bottom-end' }}
         label={trans(props.label as any)}
         name={props.name}
         placeholder={trans(props.placeholder as any)}
         value={props.value}
         onChange={props.onChange}
         error={props.errorMessage ? <I18nLabel label={props.errorMessage} /> : undefined}
      />
   )
}
