import { Flex, Text } from '@mantine/core'
import { ChevronRight, House } from 'lucide-react'
import { useTranslate } from '@shared/i18n'
import { Link } from 'react-router'
import _ from 'lodash'
import { useNavigator } from '../../../../../hooks'

export const MobileBreadcrumbComponent = () => {
   const { path } = useNavigator()
   const { trans } = useTranslate()

   return (
      <Flex c="dimmed" align="center" columnGap="xs">
         <House size={24} />
         <ChevronRight size={18} />
         {path?.split('/')?.at(1) !== '' ? (
            <Link to={`/${path?.split('/')?.at(1)}`} style={{ textDecoration: 'none' }}>
               <Text size="lg" c="dimmed">
                  {_.upperFirst(trans(`menu.${path?.split('/')?.at(1)}`))}
               </Text>
            </Link>
         ) : (
            <Link to={`/${path?.split('/')?.at(1)}`} style={{ textDecoration: 'none' }}>
               <Text size="lg" c="dimmed">
                  {_.upperFirst(trans('menu.dashboard'))}
               </Text>
            </Link>
         )}
      </Flex>
   )
}
