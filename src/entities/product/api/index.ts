import { productList } from '../asset'
import { Product } from '../model/product'

export const productsByCategoryCollection = (categoryId: string): Array<Product> => {
   return productList.reduce((res: Product[], item) => {
      item.categoryId == categoryId && res.push(item)
      return res
   }, [])
}

export const productCollection = (): Array<Product> => {
   return productList
}

export const productBySlug = (slug: string): Product | undefined => {
   console.log(
      { slug },
      productList.find(item => item.slug === slug),
   )
   return productList.find(item => item.slug === slug)
}
