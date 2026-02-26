import { Image, Stack, Text, Table, Checkbox, ScrollArea, Box } from '@mantine/core'
// @ts-ignore
import classes from './AppTable.module.scss'
import { I18nLabel } from '@shared/i18n'
import React, { useState, useEffect } from 'react'
import type { Pagination } from '../../../business/request'

export { ActionHelper } from './helpers/ActionHelper'

type BgVariant = 'transparent' | 'white' | 'gray'
type Spacing = 'none' | 'sm' | 'md' | 'lg'

export interface TableColumn {
   accessor: any
   title?: any
   render?: (record: any, index: number) => any
   width?: number | string
   textAlign?: 'left' | 'center' | 'right' | any
   sortable?: boolean
}

export default function AppTable<T extends Record<string, any>>({
   records,
   columns,
   withSelection = false,
   onSelectionChange,
   ...props
}: {
   records: T[]
   columns: TableColumn[]
   pagination?: Pagination
   onPageChange?: (page: number, limit: number) => void
   onRowClick?: (data: T, index: number) => void
   withPagination?: boolean
   withSelection?: boolean
   onSelectionChange?: (selectedRecords: T[]) => void
   emptyState?: React.ReactNode
   bg?: BgVariant
   padding?: Spacing
   margin?: Spacing
   height?: string | number
   minHeight?: string | number
}) {
   const [selection, setSelection] = useState<T[]>([])

   useEffect(() => {
      if (onSelectionChange) {
         onSelectionChange(selection)
      }
   }, [selection, onSelectionChange])

   const toggleAll = () => {
      setSelection(current => (current.length === records.length ? [] : records))
   }

   const toggleRow = (record: T) => {
      setSelection(current =>
         current.includes(record) ? current.filter(item => item !== record) : [...current, record],
      )
   }

   const isSelected = (record: T) => selection.includes(record)

   const getValue = (record: T, accessor: keyof T | string): any => {
      if (typeof accessor === 'string' && accessor.includes('.')) {
         // Handle nested properties like 'user.name'
         return accessor.split('.').reduce((obj, key) => obj?.[key], record)
      }
      return record[accessor as keyof T]
   }

   const renderCell = (record: T, column: TableColumn, index: number) => {
      if (column.render) {
         return column.render(record, index)
      }
      return getValue(record, column.accessor)
   }

   const rows = records.map((record, index) => (
      <Table.Tr
         key={index}
         bg={isSelected(record) ? 'var(--mantine-color-blue-light)' : undefined}
         style={{ cursor: props.onRowClick ? 'pointer' : undefined }}
         onClick={() => props.onRowClick && props.onRowClick(record, index)}
      >
         {withSelection && (
            <Table.Td onClick={e => e.stopPropagation()}>
               <Checkbox checked={isSelected(record)} onChange={() => toggleRow(record)} />
            </Table.Td>
         )}
         {columns.map((column, columnIndex) => (
            <Table.Td
               key={columnIndex}
               w={column.width}
               ta={column.textAlign || 'left'}
               style={{
                  textAlign: column.textAlign || 'left',
                  verticalAlign: 'middle',
                  paddingInline: '16px',
               }}
            >
               <div
                  style={{
                     display: 'flex',
                     justifyContent:
                        column.textAlign === 'center'
                           ? 'center'
                           : column.textAlign === 'right'
                             ? 'flex-end'
                             : 'flex-start',
                     alignItems: 'center',
                  }}
               >
                  {renderCell(record, column, index)}
               </div>
            </Table.Td>
         ))}
      </Table.Tr>
   ))

   const tableContent = (
      <Table
         maw="100%"
         className={classes.table}
         style={{
            backgroundColor:
               props.bg === 'white'
                  ? 'white'
                  : props.bg === 'gray'
                    ? 'var(--mantine-color-gray-0)'
                    : 'transparent',
         }}
      >
         <Table.Thead className={classes.header}>
            <Table.Tr>
               {withSelection && (
                  <Table.Th w={40}>
                     <Checkbox
                        onChange={toggleAll}
                        checked={selection.length === records.length}
                        indeterminate={selection.length > 0 && selection.length !== records.length}
                     />
                  </Table.Th>
               )}
               {columns.map((column, index) => (
                  <Table.Th
                     key={index}
                     w={column.width}
                     style={{ textAlign: column.textAlign || 'left' }}
                  >
                     <Box
                        pl={index == 0 ? '10px' : '0px'}
                        pr={index == columns.length - 1 ? '10px' : '0px'}
                     >
                        {column.title || String(column.accessor)}
                     </Box>
                  </Table.Th>
               ))}
            </Table.Tr>
         </Table.Thead>
         <Table.Tbody>
            {records.length === 0 ? (
               <Table.Tr>
                  <Table.Td colSpan={columns.length}>
                     {props.emptyState ?? (
                        <Stack align="center" gap="xs" p="xs" h={props.minHeight ?? '50vh'}>
                           <Box h="30%" mt="5%">
                              <Image
                                 width="100%"
                                 height="100%"
                                 src="/empty.svg"
                                 alt="No data found"
                              />
                           </Box>
                           <Text c="dimmed" size="sm" mt="sm">
                              <I18nLabel label="text.no.data.found" />
                           </Text>
                        </Stack>
                     )}
                  </Table.Td>
               </Table.Tr>
            ) : (
               rows
            )}
         </Table.Tbody>
      </Table>
   )

   return (
      <div
         className={classes.root}
         style={{
            height: props.height,
         }}
      >
         {props.height ? <ScrollArea h={props.height}>{tableContent}</ScrollArea> : tableContent}
      </div>
   )
}
