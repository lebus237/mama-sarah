import { I18nDate, I18nLabel } from '@shared/i18n'
import { ActionIcon, Avatar, Box, Flex, Group, Stack, Text } from '@mantine/core'
import { IconCircleCheck, IconCircleX, IconPrinter } from '@tabler/icons-react'
import GenderBadge from '../../badge/GenderBadge'
import { printLink } from '../../../../lib'
import StatusBadge from '../../badge/StatusBadge'
import type { DataTableColumn } from 'mantine-datatable'
export { ActionHelper } from './ActionHelper'
export { ClickableEntry } from './ClickableHelper'

export const thumbnailHelper = (srcKey?: string): DataTableColumn => {
   return {
      accessor: 'thumbnail',
      width: '5%',
      textAlign: 'center',
      title: <I18nLabel label="text.thumbnail" />,
      render: (record: any) => (
         <Group wrap="nowrap" gap="sm" align="center">
            <Avatar
               src={record[srcKey ?? 'imageUrl'] || '/images/products/products.png'}
               size={40}
               radius="sm"
               alt={record.designation}
               onError={(e: any) => {
                  e.currentTarget.src = '/images/products/products.png'
               }}
            />

            <Stack gap={0}>
               <Text size="sm" fw={500} lineClamp={1}>
                  {record.designation ?? ''}
               </Text>

               {record.content && (
                  <Text size="xs" c="dimmed" lineClamp={1}>
                     {record.content}
                  </Text>
               )}
            </Stack>
         </Group>
      ),
   }
}

export const nameHelper = (): DataTableColumn => {
   return {
      accessor: '_',
      title: <I18nLabel label="text.name" />,
      render: (record: any) => (
         <span>
            {record.lastName && `${record.lastName} ${record.firstName ?? ''}`}
            {record.name && `${record.name}`}
         </span>
      ),
   }
}

export const designationHelper = (column?: string, title?: string): DataTableColumn => {
   return {
      accessor: title ?? 'text.designation',
      title: <I18nLabel label={title ?? 'text.designation'} />,
      render: (record: any) => <span>{record[column ?? 'designation']}</span>,
   }
}

export const productNameHelper = (): DataTableColumn => {
   return {
      accessor: '_',
      title: <I18nLabel label="text.product.name" />,
      render: (record: any) => (
         <Box display="flex">
            <Box
               mr="xs"
               style={{
                  height: '40px',
                  width: '40px',
                  borderRadius: 'var(--mantine-radius-sm)',
                  overflow: 'hidden',
                  margin: 0,
               }}>
               <img
                  src={record['imageUrl'] || '/images/products/products.png'}
                  alt="..."
                  onError={e => {
                     e.currentTarget.src = '/images/products/products.png'
                  }}
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
               />
            </Box>
            <Box>
               {record.lastName && `${record.lastName} ${record.firstName ?? ''}`}
               {record.name && `${record.name}`}
            </Box>
         </Box>
      ),
   }
}

export const dateHelper = (
   column?: string,
   title?: string,
   format?: string,
   width?: string,
): DataTableColumn => {
   return {
      width: width ?? '10%',
      textAlign: 'right',
      accessor: title ?? 'text.date',
      title: <I18nLabel label={title ?? 'text.date'} />,
      render: (record: any) => <I18nDate date={record[column ?? 'createdAt']} format={format} />,
   }
}

export const priceHelper = (column?: string, title?: string, width?: string): DataTableColumn => {
   return {
      textAlign: 'right',
      width: width,
      accessor: column ?? 'text.amount',
      title: <I18nLabel label={title ?? 'text.amount'} />,
      render: (record: any) => (
         <strong>{(record[column ?? 'amount'] ?? 0)?.toLocaleString()} XAF</strong>
      ),
   }
}

export const quantityHelper = (
   column?: string,
   title?: string,
   width?: string,
): DataTableColumn => {
   return {
      accessor: column ?? '',
      textAlign: 'center',
      width: width,
      title: <I18nLabel label={title ?? 'text.quantity'} />,
      render: (record: any) => <Flex justify="center">{record[column ?? 'quantity']}</Flex>,
   }
}

export const genderHelper = (column?: string, title?: string, width?: string): DataTableColumn => {
   return {
      accessor: 'gender',
      width: width,
      textAlign: 'center',
      title: <I18nLabel label={title ?? 'text.gender'} />,
      render: (record: any) => (
         <Group justify="center" w="100%">
            <GenderBadge gender={record[column ?? 'gender']} />
         </Group>
      ),
   }
}

export const statusHelper = (column?: string, title?: string, width?: string): DataTableColumn => {
   return {
      width: width ?? '10%',
      accessor: column ?? 'status',
      textAlign: 'center',
      title: <I18nLabel label={title ?? 'text.status'} />,
      render: (record: any) => <StatusBadge status={`status.${record[column ?? 'status']}`} />,
   }
}

export const tablePrintHelper = (title?: string): DataTableColumn => {
   return {
      accessor: 'print',
      textAlign: 'center',
      title: <I18nLabel label={title ?? 'text.print'} />,
      render: (record: any) => (
         <ActionIcon
            size="lg"
            disabled={record.link === undefined}
            onClick={() => printLink(record.link)}>
            <IconPrinter size={20} string={1} />
         </ActionIcon>
      ),
   }
}

export const booleanHelper = (property: string, label?: string) => {
   return {
      width: '10%',
      accessor: 'property',
      textAlign: 'center',
      title: <I18nLabel label={label ?? 'text.state'} />,
      render: (record: any) =>
         record[property] ? <IconCircleCheck color="green" /> : <IconCircleX color="red" />,
   }
}
