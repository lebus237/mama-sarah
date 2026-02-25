// @ts-nocheck
import { MultiSelect, Select, type SelectProps, type MultiSelectProps } from '@mantine/core'
import { useTranslate } from '@shared/i18n'
import { useState } from 'react'

interface OptionType {
   label: string
   value: string | number
}

interface BaseProps {
   name?: any
   label?: any
   placeholder?: any
   errorMessage?: string
   options: OptionType[]
   onChange?: (value: any) => void
}

// 🔹 If isMultiSelect = false → normal Select
export type SingleSelectInputProps = BaseProps &
   Omit<SelectProps, 'data' | 'value' | 'onChange'> & {
      isMultiSelect?: false
      value?: any
      defaultValue?: string | null
      onChange?: (value: string | null) => void
   }

// 🔹 If isMultiSelect = true → MultiSelect
export type MultiSelectInputProps = BaseProps &
   Omit<MultiSelectProps, 'data' | 'value' | 'onChange'> & {
      isMultiSelect: true
      value?: any
      defaultValue?: string[]
      onChange?: (value: string[]) => void
   }

export type AppSelectInputType = SingleSelectInputProps | MultiSelectInputProps

export default function AppSelectInput({ isMultiSelect = false, ...props }: AppSelectInputType) {
   const { trans } = useTranslate()
   const [searchValue, setSearchValue] = useState('')

   const data =
      props.options?.map(opt => ({
         value: opt.value,
         label: trans(opt.label),
      })) ?? []

   if (isMultiSelect) {
      return (
         <MultiSelect
            {...props}
            clearable
            searchable
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            name={props.name}
            value={props.value}
            onChange={value => props.onChange?.(value)}
            data={data}
            label={trans(props.label)}
            placeholder={trans(props.placeholder)}
            error={props.errorMessage ? trans(props.errorMessage) : undefined}
         />
      )
   }

   return (
      <Select
         {...props}
         name={props.name}
         value={props.value}
         onChange={value => props.onChange?.(value)}
         data={data}
         label={trans(props.label)}
         placeholder={trans(props.placeholder)}
         error={props.errorMessage ? trans(props.errorMessage) : undefined}
      />
   )
}
