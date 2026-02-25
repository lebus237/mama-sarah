import { Box, Flex, Stack, Text, Title, useMantineColorScheme } from '@mantine/core'
// @ts-ignore
import styles from './styles/AnalyticsCard.module.scss'
import React from 'react'
import { IconCircleDot } from '@tabler/icons-react'

export interface AnalyticsCardProps {
   title: string
   value?: number | string
   asPercentage?: boolean
   icon?: React.ReactNode
   color?: string
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
   title,
   icon,
   asPercentage,
   value,
   color = 'default',
}) => {
   const { colorScheme } = useMantineColorScheme()
   return (
      <Box w="100%" className={styles.container}>
         <Flex justify="space-between" align="center">
            <Stack>
               <Text size="sm" fw={600} c={colorScheme === 'dark' ? `white` : `dimmed`}>
                  {!asPercentage ? value : `${value}%`}
               </Text>
               <Title
                  size="xs"
                  fw={300}
                  fs="italic"
                  mt="xs"
                  c={colorScheme === 'dark' ? `white` : `dimmed`}>
                  {title}
               </Title>
            </Stack>
            <Box className={styles.icon} c={colorScheme === 'dark' ? `${color}.8` : `${color}.9`}>
               {icon ?? <IconCircleDot />}
            </Box>
         </Flex>
      </Box>
   )
}
