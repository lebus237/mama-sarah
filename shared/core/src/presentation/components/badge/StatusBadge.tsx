import { I18nLabel } from '@shared/i18n'
import { Badge, Flex, useMantineColorScheme } from '@mantine/core'
import { IconPoint } from '@tabler/icons-react'

type StatusBadgeProps = {
   status: string
   color?: string
   icon?: any
   variant?: 'outline' | 'filled'
}

export default function StatusBadge({
   status,
   color = 'gray',
   icon: Icon = IconPoint,
   ...props
}: StatusBadgeProps) {
   const { colorScheme } = useMantineColorScheme()

   return (
      <Badge
         size="lg"
         c={color}
         radius="xl"
         variant={props.variant ?? 'filled'}
         style={{ textTransform: 'lowercase' }}
         color={colorScheme === 'light' ? `${color}.2` : `${color}.7`}
      >
         <Flex align="center" gap={2}>
            <Icon size={20} stroke={1} />
            <I18nLabel label={status ?? `status`} />
         </Flex>
      </Badge>
   )
}
