import { useTranslate } from '@shared/i18n'
import { Box, Text } from '@mantine/core'
// @ts-ignore
import styles from './ModulePage.module.scss'
import _ from 'lodash'
import type { ModuleItemType } from '../../../types'
import { useNavigator } from '../../../hooks'

export function ModuleItem(props: { module: ModuleItemType; isMobile?: boolean }) {
   const { navigate } = useNavigator()
   const { trans } = useTranslate()

   return (
      <Box className={styles.moduleSectionItem} onClick={() => navigate(props.module.path)}>
         <Box className={styles.moduleIconBox} mr="md">
            <div className={styles.moduleIcon}>{props.module.icon}</div>
         </Box>
         <Box my="auto">
            <Text fw={700} size="sm">
               {_.truncate(
                  trans(
                     props.isMobile ? `menu.${props.module.name}` : `module.${props.module.name}`,
                  ),
                  { length: 60 },
               )}
            </Text>
            <Text fw={400} size="xs" c="dimmed" display={{ md: 'block', base: 'none' }}>
               {_.truncate(trans(`module.${props.module.name}.description`), { length: 60 })}
            </Text>
         </Box>
      </Box>
   )
}
