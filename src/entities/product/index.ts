export * from './asset'
export { type Product } from './model/product'
export { type ProductCategory } from './model/product-category'

//API
export {
   productCollection as getProducts,
   productsByCategoryCollection as getProductsByCategory,
   productBySlug,
} from './api'
