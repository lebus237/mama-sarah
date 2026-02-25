import type { Pagination } from './Pagination'
import type { DateRange } from './DateRange'

export interface CollectionQueryType {
   pagination: Pagination
   hasRange?: boolean
   query?: string
   filter?: string | string[]
   order?: string | string[]
   dateRange?: DateRange
   printUrl?: string
   excelUrl?: string
}

export interface CollectionResponseType {
   pagination: Pagination
   filter?: string[]
   order?: string[]
   dateRange?: DateRange
}
