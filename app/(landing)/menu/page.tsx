import { MenuPage } from '@/views/menu'
import { AppRouterProps } from '../../types'
import { productBySlug } from '@/entities/product'

export default async function Page(routerProps: AppRouterProps) {
   const { element } = await routerProps.searchParams

   const dish = productBySlug(element as string)

   return <MenuPage product={dish!} />
}
