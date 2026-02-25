import React, { useState, useEffect } from 'react'
import {
   Combobox,
   useCombobox,
   Text,
   Group,
   Loader,
   InputBase, // Change TextInput to InputBase
   Button,
   ScrollArea,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { I18nLabel, useTranslate } from '@shared/i18n'

interface OptionType {
   label?: string | any | React.ReactNode | undefined
   value: string
}

export interface AsyncComboboxInputProps {
   name?: any
   value?: any
   label?: any
   placeholder?: any
   customQuery?: any
   onChange?: (value?: string, selectedOption?: any) => void
   fetchApi: (data: any) => Promise<any>
   parseOption?: (item: any) => any
   onAddClick?: () => void
   addButtonLabel?: string
   errorMessage?: string
   enableAdd?: boolean
   size?: string
   clearable?: boolean
   disabled?: boolean
   required?: boolean
   selectFirst?: boolean
}

export default function AsyncComboboxInput(props: AsyncComboboxInputProps) {
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
      customQuery,
      placeholder,
      disabled = false,
      required = false,
      selectFirst = false,
      ...restProps
   } = props

   const [options, setOptions] = useState<OptionType[]>([])
   const [loading, setLoading] = useState(false)
   const [query, setQuery] = useState('')

   const combobox = useCombobox({
      onDropdownClose: () => {
         combobox.resetSelectedOption()
         setQuery('') // Clear search when dropdown closes
      },
      onDropdownOpen: () => {
         setQuery('') // Clear search when dropdown opens
      },
   })

   // Get selected option label
   const selectedOption = options.find(option => option.value === props.value)

   // Fetch options from API
   const fetchOptions = async (searchQuery?: string, customQuery?: any) => {
      setLoading(true)

      try {
         const { data } = await fetchApi({
            q: searchQuery ?? undefined,
            ...customQuery,
         })
         setOptions(
            data.map((option: any) =>
               parseOption
                  ? {
                       ...option,
                       value: option.id,
                    }
                  : {
                       ...option,
                       value: option.id,
                       label:
                          option?.lastName !== undefined
                             ? `${option.lastName} ${option.firstName}`
                             : option.label || option.name || option.title || String(option.id),
                    },
            ),
         )
      } catch (error) {
         console.error('Failed to fetch options:', error)
         setOptions([])
      } finally {
         setLoading(false)
      }
   }

   // Handle option selection
   const handleOptionSubmit = (value: string) => {
      if (value === '__add_new__') {
         onAddClick?.()
         combobox.closeDropdown()
         return
      }

      let selectedOption = options.find(option => option.value === value)

      onChange?.(value, selectedOption)
      combobox.closeDropdown()
   }

   useEffect(() => {
      ;(async () => {
         await fetchOptions(query, customQuery)
      })()
   }, [query, customQuery])

   useEffect(() => {
      if (selectFirst && !props.value && options.length > 0) {
         const first = options[0]
         onChange?.(first.value, first)
      }
   }, [options, selectFirst])

   return (
      <Combobox store={combobox} onOptionSubmit={handleOptionSubmit} disabled={disabled}>
         <Combobox.Target>
            <InputBase
               {...restProps}
               label={label ? trans(label) : undefined}
               // placeholder={placeholder ? trans(placeholder) : undefined}
               component="button"
               type="button"
               pointer
               onChange={event => {
                  setQuery(event.currentTarget.value)
                  combobox.openDropdown()
                  combobox.updateSelectedOptionIndex('active')
               }}
               rightSection={
                  <Group gap="xs">{loading ? <Loader size={18} /> : <Combobox.Chevron />}</Group>
               }
               variant="default"
               rightSectionPointerEvents="none"
               onClick={() => combobox.openDropdown()}
               error={errorMessage ? <I18nLabel label={errorMessage} /> : undefined}
               required={required}
               disabled={disabled}>
               {selectedOption ? (
                  parseOption ? (
                     parseOption(selectedOption)
                  ) : (
                     selectedOption.label
                  )
               ) : (
                  <span style={{ color: 'var(--mantine-color-placeholder)' }}>
                     {placeholder ? trans(placeholder) : ''}
                  </span>
               )}
            </InputBase>
         </Combobox.Target>

         <Combobox.Dropdown>
            <Combobox.Search
               value={query}
               autoFocus
               onChange={event => setQuery(event.currentTarget.value)}
               placeholder={trans('text.search')}
            />

            <Combobox.Options>
               <ScrollArea.Autosize type="scroll" mah="30vh">
                  {loading ? (
                     <Combobox.Empty>
                        <Text size="sm" c="dimmed">
                           {trans('loading')}
                        </Text>
                     </Combobox.Empty>
                  ) : options.length === 0 ? (
                     <Combobox.Empty>
                        <Text size="sm" my="8%" c="dimmed">
                           {trans('no_options_found')}
                        </Text>
                     </Combobox.Empty>
                  ) : (
                     options.map((option: any) => (
                        <Combobox.Option key={option.value} value={option.value}>
                           {parseOption ? parseOption(option) : option.label}
                        </Combobox.Option>
                     ))
                  )}
                  {enableAdd && (
                     <Combobox.Option
                        key="__add_new__"
                        value="__add_new__"
                        style={{
                           borderTop: '1px solid var(--mantine-color-gray-3)',
                           marginTop: '4px',
                           paddingTop: '8px',
                        }}>
                        <Button leftSection={<IconPlus size={20} />} w="100%" size="xs">
                           <I18nLabel label={addButtonLabel} />
                        </Button>
                     </Combobox.Option>
                  )}
               </ScrollArea.Autosize>
            </Combobox.Options>
         </Combobox.Dropdown>
      </Combobox>
   )
}
