'use client'

import { useEffect, useState } from 'react'

import { useAppState } from './use-app-state'

type TableParams = {
   offset: number
   limit: number
   total: number
}

export interface CollectionProps {
   meta: {
      pagination: TableParams
      order?: any
      filter?: any
      dateRange?: any
   }
   analytics?: any[]
   data: any[]
}

export const defaultCollection: CollectionProps = {
   meta: {
      pagination: {
         offset: 1,
         limit: 30,
         total: 0,
      },
   },
   data: [],
}

export type QueryType = {
   query?: string
   order?: string
   filter?: string
   dateRange?: { fromDate?: string; toDate?: string }
}

export interface CollectionControllerProps {
   loading: boolean
   canLoadMore: boolean
   collection: CollectionProps
   onOrderTable: (order: string) => void
   onFilterTable: (filter: string) => void
   setCollection: (
      value: ((prevState: CollectionProps) => CollectionProps) | CollectionProps,
   ) => void
   setPagination: (page: number, pageSize: number) => Promise<void>
   onFilterRange: (fromDate: string, toDate: string) => void
   onSearch: (text?: string) => void
   onClear: () => void
   loadMore: () => void
   fetchData: (page?: number, pageSize?: number) => void
   paginationHandler: (page: any, limit: any) => Promise<void>
}

export type TablePagination = {
   offset: number
   limit: number
}

export default function useCollectionController(
   fetchCollection: (props?: any) => Promise<any>,
   customQuery = {},
   pagination?: TablePagination,
   refresh?: any,
) {
   const [loading, setLoading] = useState(false)
   const [query, setQuery] = useState<QueryType>({})
   const { appRefresh } = useAppState()
   const [collection, setCollection] = useState<CollectionProps>(defaultCollection)
   const canLoadMore =
      collection?.meta?.pagination?.total /
         (collection?.meta?.pagination?.limit * collection?.meta?.pagination?.offset) >
      1

   useEffect(() => {
      ;(async () => {
         await fetchData(
            pagination?.offset ?? collection?.meta?.pagination.offset,
            pagination?.limit ?? collection?.meta?.pagination.limit,
         )
      })()
   }, [refresh, query, appRefresh])

   const fetchData = async (page?: number, pageSize?: number) => {
      setLoading(true)

      let params: any = {
         ...customQuery,
         'q': query.query,
         'filter': query.filter,
         'order': query.order,
         'page[offset]': page ?? pagination?.offset,
         'page[limit]': pageSize ?? pagination?.limit,
      }

      const response: CollectionProps = await fetchCollection(params)

      setLoading(false)
      setCollection(response)
   }

   const loadMore = async () => {
      setLoading(true)

      let params: any = {
         ...customQuery,
         'page[offset]': (collection.meta?.pagination.offset ?? 1) + 1,
         'page[limit]': collection.meta?.pagination.limit ?? pagination?.limit ?? 30,
      }

      const response: CollectionProps = await fetchCollection(params)

      setLoading(false)
      setCollection(prevState => ({
         ...response,
         meta: response.meta,
         data: [...prevState.data, ...response?.data],
      }))
   }

   const paginationHandler = async (page: any, limit?: any) =>
      await fetchData(page, limit ?? collection?.meta?.pagination.limit)
   const onSearch = (text?: string) => setQuery(prev => ({ ...prev, query: text }))
   const onOrderTable = (order: string) => setQuery(prev => ({ ...prev, order: order }))
   const onFilterTable = (filter: string) => setQuery(prev => ({ ...prev, filter: filter }))
   const setPagination = (page: number, pageSize: number) => fetchData(page, pageSize)
   const onFilterRange = (fromDate: string, toDate: string) =>
      setQuery(prev => ({
         ...prev,
         dateRange: {
            fromDate: fromDate,
            toDate: toDate,
         },
      }))

   const onClear = () => setCollection(defaultCollection)

   // @ts-ignore
   return <CollectionControllerProps>{
      query,
      loading,
      collection,
      onOrderTable,
      onFilterTable,
      setCollection,
      setPagination,
      onFilterRange,
      onSearch,
      onClear,
      fetchData,
      loadMore,
      canLoadMore,
      paginationHandler,
   }
}
