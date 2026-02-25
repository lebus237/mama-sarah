// @ts-ignore
import classes from './SectionContainer.module.scss'
import { Box, Grid, Text, useMantineColorScheme } from '@mantine/core'
import { I18nLabel } from '@shared/i18n'
import React from 'react'
import { IconPackage } from '@tabler/icons-react'

export type SectionContainerProps = {
   title?: string
   icon?: React.ReactNode
   actions?: React.ReactNode
   children: React.ReactNode
   description?: string
   withShadow?: boolean
   backgroundColor?: string | number | any
}

function SectionContainer({ backgroundColor = 'default', ...props }: SectionContainerProps) {
   const { colorScheme } = useMantineColorScheme()

   const icon = props.icon ?? <IconPackage size={35} stroke={1} />

   return (
      <Grid justify="space-between" gutter={0}>
         {props.title && (
            <Grid.Col span={{ span: 12, md: 6 }} display="flex" mb={{ xs: 2, md: 10 }}>
               <Box
                  mr="md"
                  className={classes.nameBox}
                  bg={colorScheme === 'light' ? `${backgroundColor}.2` : `${backgroundColor}.8`}>
                  <div className={classes.boxIconContainer}>{icon}</div>
               </Box>
               <Box my="auto">
                  <Text fw={700} size="1.5em" c="gray.7">
                     <I18nLabel label={props.title} />
                  </Text>
                  <Text fw={500} size="md" c="dimmed">
                     <I18nLabel label={props.description} />
                  </Text>
               </Box>
            </Grid.Col>
         )}

         {props.actions && <Grid.Col span={{ span: 12, md: 6 }}>{props.actions}</Grid.Col>}

         <Grid.Col span={{ span: 12 }}>{props.children}</Grid.Col>
      </Grid>
   )
}

export default SectionContainer
