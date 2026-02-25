import { Avatar, Box, Grid, Stack, Text } from '@mantine/core'

// @ts-ignore
import styles from './Dashboard.module.scss'

import { useAppState, useModules, useViewPort } from '../../../hooks'
import { I18nLabel } from '@shared/i18n'
import { ModuleCardComponent } from '../../components/common'

function SideActionSection() {
   const { lastModules } = useModules()
   const viewPort = useViewPort()
   const { context } = useAppState()

   return (
      <Stack>
         <Grid mt={{ base: '-xl', md: 0 }}>
            {!viewPort?.isMobile && (
               <>
                  <Grid.Col span={12}>
                     <div className={styles.welcomeCard}>
                        <Box display="flex" content="space-between">
                           <Box>
                              <Avatar
                                 size={80}
                                 bg="gray.3"
                                 className={styles.avatar}
                                 src="https://api.dicebear.com/7.x/personas/svg?seed=joyce"
                              />
                           </Box>

                           <Box ml="md">
                              <Text size="lg" fw={600} className={styles.welcomeTitle}>
                                 <I18nLabel label="text.hello" /> {context.context?.profileName} 👋
                              </Text>
                              <Text size="sm" c="dimmed" className={styles.welcomeSubtitle}>
                                 ccc
                              </Text>
                           </Box>
                        </Box>
                     </div>
                  </Grid.Col>
                  <>
                     {!viewPort?.isMobile &&
                        lastModules.map((module, index) => (
                           <Grid.Col span={12} key={index}>
                              <ModuleCardComponent module={module} />
                           </Grid.Col>
                        ))}
                  </>
               </>
            )}
         </Grid>
      </Stack>
   )
}

export default SideActionSection
