import { MenuPage } from '@/views/menu'
import { AppRouterProps } from '../../types'
import { Product, productBySlug, productCollection } from '@/entities/product'

export default async function Page(routerProps: AppRouterProps) {
   const { element } = await routerProps.searchParams
   let dish: Product | undefined

   if (!element) {
      const list = productCollection()

      dish = productBySlug(list[0]?.slug!)
   } else {
      dish = productBySlug(element as string)
   }

   return <MenuPage product={dish} />
}
