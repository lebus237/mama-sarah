import { productList } from '../asset'
import { Product } from '../model/product'

export const getProductsByCategory = (categoryId: string): Array<Product> => {
   return productList.reduce((res: Product[], item) => {
      item.categoryId == categoryId && res.push(item)
      return res
   }, [])
}

export const getProducts = (): Array<Product> => {
   return productList
}
