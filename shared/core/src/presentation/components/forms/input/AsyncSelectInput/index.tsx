import { Select, type SelectProps, Loader } from '@mantine/core'
import { useTranslate } from '@shared/i18n'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

interface OptionType {
   label: string
   value: string
}

export interface AsyncSelectProps extends Omit<SelectProps, 'data' | 'searchable'> {
   name?: any
   value?: any
   label?: any
   placeholder?: any
   onChange?: (value?: any) => void
   onClear?: (value?: any) => void
   errorMessage?: string

   // Async specific props
   fetchApi: (query?: any) => Promise<any>
   debounceMs?: number
   minSearchLength?: number
   searchable?: boolean
   clearSearchOnSelect?: boolean
   loadOnMount?: boolean
}

export default function AppAsyncSelectInput(props: AsyncSelectProps) {
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

   // Track if update comes from selecting (not typing)
   const isSelectingRef = useRef(false)

   const fetchOptions = useCallback(
      async (query?: string) => {
         try {
            setLoading(true)
            const result = await fetchApi(query ? { q: query } : undefined)

            const data =
               result?.data?.map((item: any) => ({
                  value: item.id,
                  label: item?.name ?? item?.designation,
               })) ?? []

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
      // Skip fetch if change came from selecting
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

   const handleChange = (value: string | null) => {
      onChange?.(value ?? undefined)

      // mark selection so searchValue update doesn’t trigger fetch
      isSelectingRef.current = true

      if (clearSearchOnSelect) {
         setSearchValue('') // clear only the input, not the selected value
      }
   }

   return (
      <Select
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
