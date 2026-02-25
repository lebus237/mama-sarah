import React, { useState, useCallback, useRef } from 'react'
import { Autocomplete, type AutocompleteProps, Loader, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { I18nLabel, useTranslate } from '@shared/i18n'
import { useDebouncedValue } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'

interface OptionType {
   label?: string | any | React.ReactNode | undefined
   value: string
   [key: string]: any
}

export interface AsyncAutocompleteInputProps {
   name?: any
   value?: any
   label?: any
   placeholder?: any
   onChange?: (value?: string, selectedOption?: any) => void
   fetchApi: (data: any) => Promise<any>
   parseOption?: (item: any) => any
   onAddClick?: () => void
   addButtonLabel?: string
   errorMessage?: string
   enableAdd?: boolean
   size?: string
   disabled?: boolean
   required?: boolean
}

export default function AsyncAutocompleteInput(props: AsyncAutocompleteInputProps) {
   const { trans } = useTranslate()
   const {
      fetchApi,
      parseOption,
      onAddClick,
      addButtonLabel = 'text.add.element',
      enableAdd = false,
      errorMessage,
      onChange,
      label,
      placeholder,
      disabled = false,
      required = false,
      size,
      ...restProps
   } = props

   const [options, setOptions] = useState<OptionType[]>([])
   const [loading, setLoading] = useState(false)
   const [searchValue, setSearchValue] = useState('')
   const [debouncedSearch] = useDebouncedValue(searchValue, 300)
   const lastSelectedRef = useRef<string>('')

   // Fetch options from API with debounce
   const fetchOptions = useCallback(
      async (searchQuery: string) => {
         setLoading(true)

         try {
            const { data } = await fetchApi(searchQuery ? { q: searchQuery } : undefined)
            const mappedOptions = data.map((option: any) => {
               const baseOption = {
                  ...option,
                  value: option.id,
               }

               if (parseOption) {
                  return baseOption
               }

               return {
                  ...baseOption,
                  label:
                     option.label ||
                     option.name ||
                     option.designation ||
                     option.title ||
                     String(option.id),
               }
            })
            setOptions(mappedOptions)
         } catch (error) {
            console.error('Failed to fetch options:', error)
            setOptions([])
         } finally {
            setLoading(false)
         }
      },
      [fetchApi, parseOption],
   )

   useQuery({
      queryKey: [`collection/options-${options}`, debouncedSearch, fetchOptions],
      queryFn: async () => await fetchOptions(debouncedSearch),
   })

   // Fetch on debounced search change
   // useEffect(() => {
   //    fetchOptions(debouncedSearch)
   // }, [debouncedSearch, fetchOptions])

   // Handle option selection
   const handleOptionSubmit = (value: string) => {
      if (value === '__add_new__') {
         onAddClick?.()
         return
      }

      const selected = options.find(option => option.value === value)
      if (selected) {
         lastSelectedRef.current = value
         onChange?.(value, selected)
      }
   }

   // Custom render option function
   const renderOption: AutocompleteProps['renderOption'] = ({ option }) => {
      if (option.value === '__add_new__') {
         return (
            <Button
               leftSection={<IconPlus size={20} />}
               variant="light"
               fullWidth
               size={size || 'sm'}
               style={{
                  borderTop: '1px solid var(--mantine-color-gray-3)',
                  marginTop: '4px',
               }}>
               <I18nLabel label={addButtonLabel} />
            </Button>
         )
      }

      const optionData = options.find(opt => opt.value === option.value)
      if (!optionData) return option.value

      return parseOption ? parseOption(optionData) : optionData.label
   }

   // Build autocomplete data
   const autocompleteData = [
      ...options.map(opt => ({
         value: opt.value,
         label: parseOption ? parseOption(opt) : opt.label,
      })),
      ...(enableAdd ? [{ value: '__add_new__', label: '' }] : []),
   ]

   return (
      <Autocomplete
         {...restProps}
         data={autocompleteData}
         value={searchValue}
         onChange={setSearchValue}
         onOptionSubmit={handleOptionSubmit}
         label={label ? trans(label) : undefined}
         placeholder={placeholder ? trans(placeholder) : undefined}
         disabled={disabled}
         required={required}
         size={size}
         error={errorMessage ? <I18nLabel label={errorMessage} /> : undefined}
         renderOption={renderOption}
         rightSection={loading ? <Loader size={18} /> : undefined}
         maxDropdownHeight={400}
         limit={50}
         styles={{ input: { height: '40px' }, root: { width: '100%' } }}
      />
   )
}
