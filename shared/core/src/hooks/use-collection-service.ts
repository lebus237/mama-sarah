import React, { useCallback, useEffect, useMemo } from 'react'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { CollectionQueryType } from '../business/request'
import { useAppState } from './use-app-state'

export type CollectionServiceReturnType = {
   data: any[]
   isLoading: boolean
   meta: CollectionQueryType
   analytics: any | string[]
   onPaginate: (offset: number, limit: number) => void
   onDateChange: (fromDate?: string, toDate?: string) => void
   onChangeOrder: (value: string) => void
   onChangeFilter: (value: string) => void
   onChangeQuery: (value: string) => void
   onSearch: (value: string) => void
}

const defaultQuery: CollectionQueryType = {
   pagination: { page: 1, limit: 20 },
}

const parseQuery = (query: CollectionQueryType, customQuery: any) => {
   return {
      'page[offset]': query?.pagination?.page,
      'page[limit]': query?.pagination?.limit,
      'q': query.query,
      'order': query.order,
      'filter': query.filter,
      'fromDate': query.dateRange?.fromDate,
      'toDate': query.dateRange?.toDate,
      ...customQuery,
   }
}

export const useCollectionService = (
   fetchCollection: (query: any) => Promise<any>,
   queryParams: CollectionQueryType = defaultQuery,
   queryKey: string = 'collection/request',
   customQuery?: any,
   refetching?: any,
   queryClientOptions?: Partial<UseQueryOptions<any, any>>,
) => {
   const { appRefresh } = useAppState()
   const [collectionQuery, setCollectionQuery] = React.useState<CollectionQueryType>(queryParams)

   const [meta, setMeta] = React.useState<CollectionQueryType>({
      pagination: { page: 1, limit: 20 },
   })

   // Memoize the parsed query to avoid unnecessary re-computations
   const parsedQuery = useMemo(
      () => parseQuery(collectionQuery, customQuery),
      [collectionQuery, customQuery],
   )

   const {
      data: resp,
      isLoading,
      refetch,
   } = useQuery({
      queryKey: [
         queryKey,
         customQuery,
         window.location.href,
         window.location.hash,
         collectionQuery.query ?? 'query',
         collectionQuery.filter ?? 'filter',
         collectionQuery.order ?? 'order',
         collectionQuery.pagination.page,
         collectionQuery.pagination.limit,
         collectionQuery.dateRange?.fromDate,
         collectionQuery.dateRange?.toDate,
      ],
      queryFn: () => fetchCollection(parsedQuery),
      staleTime: 0,
      ...queryClientOptions,
   })

   useEffect(() => {
      refetch()
   }, [refetching, appRefresh])

   React.useEffect(() => {
      if (resp && resp?.meta) {
         setMeta(() => ({
            ...resp?.meta,
            pagination: {
               ...resp.meta.pagination,
               page: resp.meta.pagination.offset,
            },
         }))
      }
   }, [resp?.meta])

   // Use useCallback to prevent unnecessary re-renders of components using these functions
   const onPaginate = useCallback((offset: number, limit: number) => {
      setCollectionQuery((prevState: any) => ({
         ...prevState,
         pagination: {
            ...prevState.pagination,
            page: offset,
            limit: limit,
         },
      }))
   }, [])

   const onChangeOrder = useCallback((value: string) => {
      setCollectionQuery((prevState: any) => ({
         ...prevState,
         order: value,
         pagination: { ...prevState.pagination, page: 1 },
      }))
   }, [])

   const onChangeFilter = useCallback((value: string) => {
      setCollectionQuery((prevState: any) => ({
         ...prevState,
         filter: value,
         pagination: { ...prevState.pagination, page: 1 },
      }))
   }, [])

   const onDateChange = useCallback((fromDate?: string, toDate?: string) => {
      setCollectionQuery((prevState: any) => ({
         ...prevState,
         dateRange: { fromDate, toDate },
         pagination: { ...prevState.pagination, page: 1 },
      }))
   }, [])

   const onSearch = useCallback((value: string) => {
      setCollectionQuery((prevState: any) => ({
         ...prevState,
         query: value,
         pagination: { ...prevState.pagination, page: 1 }, // Reset to first page when searching
      }))
   }, [])

   // Add onChangeQuery for consistency (seems to be missing from original return)
   const onChangeQuery = useCallback((value: string) => {
      setCollectionQuery((prevState: any) => ({
         ...prevState,
         query: value,
         pagination: { ...prevState.pagination, page: 1 },
      }))
   }, [])

   // Memoize return object to prevent unnecessary re-renders
   return useMemo(
      (): CollectionServiceReturnType => ({
         meta,
         isLoading,
         analytics: resp?.analytics,
         onPaginate,
         onChangeOrder,
         onChangeFilter,
         onSearch,
         onDateChange,
         onChangeQuery,
         data: resp?.data ?? [],
      }),
      [
         meta,
         isLoading,
         resp?.analytics,
         resp?.data,
         onPaginate,
         onDateChange,
         onChangeOrder,
         onChangeFilter,
         onSearch,
         onChangeQuery,
      ],
   )
}
