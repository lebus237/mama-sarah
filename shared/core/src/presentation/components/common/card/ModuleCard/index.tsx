import { Box, Text } from '@mantine/core'

// @ts-ignore
import styles from './ModuleCard.module.scss'
import { I18nLabel } from '@shared/i18n'
import { IconChevronRight } from '@tabler/icons-react'

interface ModuleCardProps {
   module: any
   width?: string | number
   onClick?: () => void
}

export function ModuleCardComponent({ module, width, onClick }: ModuleCardProps) {
   return (
      <Box className={styles.moduleCard} w={width} onClick={onClick}>
         <Box className={styles.moduleIcon}>{module?.icon && <module.icon />}</Box>

         {/* Hover description overlay */}
         <Box className={styles.moduleDescription}>
            <Text size="sm">
               <I18nLabel label={`module.${module?.name}.description`} />
            </Text>
         </Box>

         <Box className={styles.moduleName}>
            <Text size="sm">
               <I18nLabel label={`module.${module?.name}`} />
            </Text>
            <IconChevronRight />
         </Box>
      </Box>
   )
}
