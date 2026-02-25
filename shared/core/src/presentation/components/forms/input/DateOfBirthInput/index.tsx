import { Group, Select } from '@mantine/core'
import { useState, useEffect, useMemo } from 'react'
import { format, getDaysInMonth } from 'date-fns'
import { useTranslate } from '@shared/i18n'

export interface DateOfBirthInputProps {
   value?: {
      birthDay?: number
      birthMonth?: number
      birthYear?: number
   }
   onChange?: (value: { birthDay: number; birthMonth: number; birthYear: number }) => void
   error?: {
      birthDay?: string
      birthMonth?: string
      birthYear?: string
   }
}

export default function DateOfBirthInput({ value, onChange, error }: DateOfBirthInputProps) {
   const { trans, lang } = useTranslate()
   const [dateState, setDateState] = useState<{
      birthDay: string | null
      birthMonth: string | null
      birthYear: string | null
   }>({
      birthDay: value?.birthDay?.toString() || null,
      birthMonth: value?.birthMonth?.toString() || null,
      birthYear: value?.birthYear?.toString() || null,
   })

   // Sync with external value changes
   useEffect(() => {
      setDateState({
         birthDay: value?.birthDay?.toString() || null,
         birthMonth: value?.birthMonth?.toString() || null,
         birthYear: value?.birthYear?.toString() || null,
      })
   }, [value?.birthDay, value?.birthMonth, value?.birthYear])

   const handleChange = (field: 'birthDay' | 'birthMonth' | 'birthYear', val: string | null) => {
      const newState = { ...dateState, [field]: val }
      setDateState(newState)

      if (newState.birthDay && newState.birthMonth && newState.birthYear && onChange) {
         onChange({
            birthDay: parseInt(newState.birthDay),
            birthMonth: parseInt(newState.birthMonth),
            birthYear: parseInt(newState.birthYear),
         })
      }
   }

   const days = useMemo(() => {
      return Array.from({ length: getDaysInMonth(dateState.birthMonth ?? 1) }, (_, i) => {
         const day = i + 1
         return {
            value: String(day),
            label: String(day).padStart(2, '0'),
         }
      })
   }, [dateState.birthMonth])

   const months = useMemo(() => {
      return Array.from({ length: 12 }, (_, i) => {
         const date = new Date(2000, i, 1)
         return {
            value: String(i + 1),
            label: format(date, 'MM'), // Translated month name
         }
      })
   }, [lang])

   const years = useMemo(() => {
      const currentYear = new Date().getFullYear()
      return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => {
         const year = currentYear - i
         return {
            value: String(year),
            label: String(year),
         }
      })
   }, [])

   // Determine if fields should be disabled
   const isMonthDisabled = !dateState.birthYear
   const isDayDisabled = !dateState.birthMonth || isMonthDisabled

   return (
      <Group grow gap={0} align="flex-start">
         <Select
            label={trans('text.year')}
            placeholder="2020"
            data={years}
            value={dateState.birthYear}
            onChange={val => handleChange('birthYear', val)}
            error={error?.birthYear}
            searchable
         />
         <Select
            label={trans('text.month')}
            placeholder="01"
            data={months}
            value={dateState.birthMonth}
            onChange={val => handleChange('birthMonth', val)}
            error={error?.birthMonth}
            searchable
            disabled={isMonthDisabled}
         />
         <Select
            label={trans('text.day')}
            placeholder="01"
            data={days}
            value={dateState.birthDay}
            onChange={val => handleChange('birthDay', val)}
            error={error?.birthDay}
            searchable
            disabled={isDayDisabled}
         />
      </Group>
   )
}
