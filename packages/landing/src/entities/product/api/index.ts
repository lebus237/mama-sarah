import { Product } from '../model/product'
import { productList } from '../asset'

export const getProductsByCategory = (categoryId: string): Array<Product> => {
   return productList.reduce((res: Product[], item) => {
      item.categoryId == categoryId && res.push(item)
      return res
   }, [])
}
