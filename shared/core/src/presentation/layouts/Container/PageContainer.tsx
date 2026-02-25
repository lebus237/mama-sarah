import { useViewPort } from '../../../hooks'
import { DesktopContainer } from './DesktopContainer'
import { MobileContainer } from './MobileContainer'
import type { ContainerProps } from './types'

export function PageContainer(props: ContainerProps) {
   const viewPort = useViewPort()

   let Container = DesktopContainer

   if (viewPort.isMobile) {
      Container = MobileContainer
   }

   return <Container {...props}>{props.children}</Container>
}
