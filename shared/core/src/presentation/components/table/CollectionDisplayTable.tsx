import { Grid, LoadingOverlay, Pagination, TextInput } from '@mantine/core'
import { IconCalendar, IconSearch } from '@tabler/icons-react'

import AppTable, { type TableColumn } from './AppTable'
import { type CollectionServiceReturnType, useViewPort } from '../../../hooks'
import AppSelectInput from '../forms/input/SelectInput'
import { useTranslate } from '@shared/i18n'
import { DatePickerInput } from '@mantine/dates'
import { AnalyticsCard, Label } from '../common'
import React from 'react'
import dayjs from 'dayjs'

export type AnalyticsItemType = {
   label: string
   key: string
   parseValue?: (value?: string | number) => string | any
   icon?: any
   color?: any
}

export type ToolSizes = {
   searchSize: number
   size?: number
   container?: number
   customFiler?: number
}

function CollectionDisplayTable({
   marginBottom = '100px',
   hidePlugins = { search: false, pagination: false, filters: false, order: false },
   ...props
}: {
   records: any[]
   columns: TableColumn[]
   controller?: CollectionServiceReturnType
   onRowClick?: (data: any) => void
   analytics?: AnalyticsItemType[]
   height?: string
   marginBottom?: string
   toolSizes?: ToolSizes
   children?: React.ReactNode
   hidePlugins?: {
      search?: boolean
      pagination?: boolean
      filters?: boolean
      order?: boolean
      range?: boolean
   }
}) {
   const { trans } = useTranslate()
   const today = dayjs()
   const screenType = useViewPort()

   //TODO: Remember to change back dateRange to hasRange
   return (
      <Grid gutter={0}>
         {props.controller?.analytics && (
            <Grid.Col span={12} mb="sm">
               <Grid justify="start">
                  {props.analytics
                     ? props.analytics.map((item, index) => (
                          <Grid.Col span={{ base: 12, sm: 3, lg: 2 }} key={index}>
                             <AnalyticsCard
                                title={trans(item.label)}
                                icon={item.icon}
                                color={item.color}
                                value={
                                   item.parseValue
                                      ? item.parseValue(props.controller?.analytics[item.key] ?? 0)
                                      : (props.controller?.analytics[item.key] ?? 0)
                                }
                             />
                          </Grid.Col>
                       ))
                     : Object.keys(props.controller?.analytics).map((item: any) => (
                          <Grid.Col span={{ base: 12, sm: 3, md: 2 }} key={item}>
                             <AnalyticsCard
                                title={trans(`text.${item}`)}
                                value={Number(
                                   props.controller?.analytics[item] ?? 0,
                                ).toLocaleString('en-FR', { style: 'currency', currency: 'XAF' })}
                             />
                          </Grid.Col>
                       ))}
               </Grid>
            </Grid.Col>
         )}
         <Grid.Col span={12} my={0}>
            <Grid justify="space-between">
               {!hidePlugins.search && (
                  <Grid.Col span={{ base: 6, md: props.toolSizes?.searchSize ?? 3 }} my="xs">
                     <TextInput
                        variant="filled"
                        leftSection={<IconSearch size="20px" />}
                        onChange={evt => props.controller?.onSearch(evt.target.value)}
                        placeholder="Search"
                     />
                  </Grid.Col>
               )}
               {props.children && (
                  <Grid.Col span={{ base: 6, md: props.toolSizes?.customFiler ?? 3 }} my="xs">
                     {props.children}
                  </Grid.Col>
               )}
               <Grid.Col span={{ base: 6, md: props.toolSizes?.container ?? 9 }}>
                  <Grid justify="end">
                     {props.controller?.meta.order && !hidePlugins.order && (
                        <Grid.Col span={{ base: 6, md: props.toolSizes?.size ?? 3 }} my="xs">
                           <AppSelectInput
                              size="sm"
                              variant="filled"
                              styles={{
                                 input: { padding: 'var(--mantine-spacing-xs)' },
                              }}
                              onChange={value => props.controller?.onChangeOrder(value)}
                              options={((props.controller?.meta.order as string[]) ?? []).map(
                                 item => ({
                                    label: trans(`text.${item}`),
                                    value: item,
                                 }),
                              )}
                           />
                        </Grid.Col>
                     )}

                     {props.controller?.meta.filter && !hidePlugins.filters && (
                        <Grid.Col span={{ base: 6, md: props.toolSizes?.size ?? 3 }} my="xs">
                           <AppSelectInput
                              size="sm"
                              variant="filled"
                              styles={{
                                 input: { padding: 'var(--mantine-spacing-xs)' },
                              }}
                              onChange={value => props.controller?.onChangeFilter(value)}
                              options={((props.controller?.meta.filter as string[]) ?? []).map(
                                 item => ({
                                    label: trans(`text.${item}`),
                                    value: item,
                                 }),
                              )}
                           />
                        </Grid.Col>
                     )}

                     {props.controller?.meta.dateRange && !hidePlugins.range && (
                        <Grid.Col span={{ base: 6, md: props.toolSizes?.size ?? 3 }} my="xs">
                           <DatePickerInput
                              type="range"
                              variant="filled"
                              clearable
                              styles={{
                                 input: { fontSize: '11px' },
                              }}
                              presets={[
                                 {
                                    value: [
                                       today.subtract(0, 'day').format('YYYY-MM-DD'),
                                       today.format('YYYY-MM-DD'),
                                    ],
                                    label: trans('text.today'),
                                 },
                                 {
                                    value: [
                                       today.subtract(1, 'day').format('YYYY-MM-DD'),
                                       today.format('YYYY-MM-DD'),
                                    ],
                                    label: trans('text.last.day'),
                                 },
                                 {
                                    value: [
                                       today.subtract(2, 'day').format('YYYY-MM-DD'),
                                       today.format('YYYY-MM-DD'),
                                    ],
                                    label: trans('text.last.2.days'),
                                 },
                                 {
                                    value: [
                                       today.subtract(7, 'day').format('YYYY-MM-DD'),
                                       today.format('YYYY-MM-DD'),
                                    ],
                                    label: trans('text.last.7.days'),
                                 },
                                 {
                                    value: [
                                       today.startOf('month').format('YYYY-MM-DD'),
                                       today.format('YYYY-MM-DD'),
                                    ],
                                    label: trans('text.this.month'),
                                 },
                                 {
                                    value: [
                                       today
                                          .subtract(1, 'month')
                                          .startOf('month')
                                          .format('YYYY-MM-DD'),
                                       today
                                          .subtract(1, 'month')
                                          .endOf('month')
                                          .format('YYYY-MM-DD'),
                                    ],
                                    label: trans('text.last.months'),
                                 },
                                 {
                                    value: [
                                       today
                                          .subtract(2, 'month')
                                          .startOf('month')
                                          .format('YYYY-MM-DD'),
                                       today
                                          .subtract(1, 'month')
                                          .endOf('month')
                                          .format('YYYY-MM-DD'),
                                    ],
                                    label: trans('text.3.months'),
                                 },
                                 {
                                    value: [
                                       today
                                          .subtract(1, 'year')
                                          .startOf('year')
                                          .format('YYYY-MM-DD'),
                                       today.subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
                                    ],
                                    label: trans('text.last.years'),
                                 },
                              ]}
                              placeholder="Pick dates range"
                              onChange={values =>
                                 values[0] !== null && values[1] !== null
                                    ? props.controller?.onDateChange(
                                         values[0] ?? undefined,
                                         values[1] ?? undefined,
                                      )
                                    : undefined
                              }
                              defaultValue={[
                                 props.controller?.meta.dateRange?.fromDate,
                                 props.controller?.meta.dateRange?.toDate,
                              ]}
                              rightSection={<IconCalendar size="20px" />}
                           />
                        </Grid.Col>
                     )}
                     {/*   <Grid.Col span={{ base: 12, md: 4 }}>*/}
                     {/*      <DatePickerInput*/}
                     {/*         type="range"*/}
                     {/*         variant="filled"*/}
                     {/*         placeholder="Pick dates range"*/}
                     {/*         rightSection={<IconCalendar size="20px" />}*/}
                     {/*      />*/}
                     {/*   </Grid.Col>*/}
                  </Grid>
               </Grid.Col>
            </Grid>
         </Grid.Col>
         <Grid.Col span={12} pos="relative">
            <LoadingOverlay
               zIndex={1000}
               overlayProps={{ radius: 'sm', blur: 1 }}
               visible={props.controller?.isLoading ?? false}
               loaderProps={{ color: 'default', type: 'dots' }}
            />
            <AppTable
               {...props}
               records={props.records}
               onPageChange={props.controller?.onPaginate}
               pagination={props.controller?.meta.pagination ?? { page: 1, limit: 10 }}
            />
         </Grid.Col>
         {!hidePlugins.pagination && (
            <Grid.Col span={12} mb={marginBottom} mt="md">
               <Grid justify="space-between" align="center" px="xs">
                  <Grid.Col span={{ base: 12, md: 3, sm: 12 }}>
                     <Label text={props.controller?.meta?.pagination.total ?? 0} />{' '}
                     <Label text={'text.elements'} />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 8, sm: 12 }}>
                     <Grid justify={screenType?.isMobile ? 'center' : 'end'}>
                        <Pagination
                           siblings={1}
                           boundaries={2}
                           defaultValue={1}
                           value={props.controller?.meta?.pagination.page ?? 1}
                           total={Math.ceil(
                              (props.controller?.meta?.pagination.total ?? 10) /
                                 (props.controller?.meta?.pagination.limit ?? 1),
                           )}
                           onChange={page => props.controller?.onPaginate(page, 10)}
                        />
                     </Grid>
                  </Grid.Col>
               </Grid>
            </Grid.Col>
         )}
      </Grid>
   )
}
export default CollectionDisplayTable
