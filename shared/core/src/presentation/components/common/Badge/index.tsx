import { Badge, type BadgeProps } from '@mantine/core'

interface AppBadgeProps extends BadgeProps {}

export function AppBadge(props: AppBadgeProps) {
   return <Badge {...props}>{props.children}</Badge>
}
