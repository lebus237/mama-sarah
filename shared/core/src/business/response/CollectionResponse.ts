export class CollectionResponse<T> {
   constructor(
      public data: T[],
      public meta: any,
      public analytics: any,
   ) {}
}

export type CollectionResponseType<T> = {
   data: T[]
   meta: any
   analytics?: any
}
