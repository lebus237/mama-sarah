import { Badge } from '@mantine/core'

export const BadgeComponent = Badge.extend({
   defaultProps: {
      radius: 'md',
   },
   styles: {
      root: {
         fontWeight: 500,
         fontSize: '0.75rem',
      },
   },
})
