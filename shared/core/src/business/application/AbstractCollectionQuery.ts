import { type CollectionQueryType, DateRange, type Pagination } from '../request'

export default abstract class AbstractCollectionQuery implements CollectionQueryType {
   constructor(
      public readonly pagination: Pagination,
      public readonly query?: string,
      public readonly filter?: string,
      public readonly order?: string,
      public readonly dateRange?: DateRange,
   ) {}
}
