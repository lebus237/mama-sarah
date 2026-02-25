import { MultiSelect, type MultiSelectProps, Loader } from '@mantine/core'
import { useTranslate } from '@shared/i18n'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

interface OptionType {
   label: string
   value: string
}

export interface AsyncMultiSelectProps extends Omit<MultiSelectProps, 'data' | 'searchable'> {
   name?: any
   value?: any[] // array of selected values
   label?: any
   placeholder?: any
   onChange?: (value?: any[]) => void
   onClear?: (value?: any) => void
   errorMessage?: string

   // Async specific props
   fetchApi: (query?: any) => Promise<any>
   debounceMs?: number
   minSearchLength?: number
   clearSearchOnSelect?: boolean
   parseOption?: (option: any) => OptionType
   loadOnMount?: boolean
}

export default function AppAsyncMultiSelect(props: AsyncMultiSelectProps) {
   const {
      fetchApi,
      minSearchLength = 0,
      clearSearchOnSelect = false,
      loadOnMount = true,
      onChange,
      ...selectProps
   } = props

   const { trans } = useTranslate()

   const [options, setOptions] = useState<OptionType[]>([])
   const [loading, setLoading] = useState(false)
   const [searchValue, setSearchValue] = useState<string>('')

   const isSelectingRef = useRef(false)

   const fetchOptions = useCallback(
      async (query?: string) => {
         try {
            setLoading(true)
            const result = await fetchApi(query ? { q: query } : undefined)
            const data =
               result?.data?.map((item: any) =>
                  props.parseOption
                     ? props.parseOption(item)
                     : {
                          value: item.id,
                          label: item.name,
                       },
               ) ?? []
            setOptions(data)
         } catch (error) {
            console.error('Failed to fetch options:', error)
            setOptions([])
         } finally {
            setLoading(false)
         }
      },
      [fetchApi],
   )

   useEffect(() => {
      if (isSelectingRef.current) {
         isSelectingRef.current = false
         return
      }

      ;(async () => {
         if (searchValue && searchValue.length >= minSearchLength) {
            await fetchOptions(searchValue)
         } else if (loadOnMount && !searchValue) {
            await fetchOptions()
         }
      })()
   }, [searchValue, minSearchLength, loadOnMount, fetchOptions])

   const transformedOptions = useMemo(
      () =>
         options.map(opt => ({
            value: opt.value,
            label: trans(opt.label),
         })),
      [options, trans],
   )

   const handleChange = (value: string[]) => {
      onChange?.(value)

      isSelectingRef.current = true

      if (clearSearchOnSelect) {
         setSearchValue('')
      }
   }

   return (
      <MultiSelect
         {...selectProps}
         clearable
         searchable
         onClear={props.onClear}
         searchValue={searchValue}
         onSearchChange={setSearchValue}
         name={props.name}
         value={props.value}
         onChange={handleChange}
         data={transformedOptions}
         label={trans(props.label)}
         placeholder={trans(props.placeholder)}
         error={props.errorMessage ? trans(props.errorMessage) : undefined}
         rightSection={loading ? <Loader size="xs" /> : undefined}
      />
   )
}
