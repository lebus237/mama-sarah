export type Product = {
   id: string
   designation: string
   slug?: string,
   description?: string
   price: number | string
   imageUrl: string
   categoryId: string
   categoryName?: string
   isAvailable?: boolean
   preferences: string[] | []
}
