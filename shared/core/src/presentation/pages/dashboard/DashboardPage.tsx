import { Box, Grid, Group, Text, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import SideActionSection from './SideActionSection'

// @ts-ignore
import styles from './styles/Dashboard.module.scss'

import { I18nLabel } from '@shared/i18n'

import ModulesHorizontalScroll from './components/ModulesHorizontalScroll'
import { useModules, useViewPort } from '../../../hooks'
import { PageContainer } from '../../layouts'
import { ModuleDisplayComponent } from '../modules/ModuleDisplayComponent'

export default function DashboardPage() {
   const { searchedModules, onSearchModule } = useModules()
   const viewPort = useViewPort()

   return (
      <PageContainer hideHeader>
         <Grid>
            <Grid.Col span={{ sm: 12, lg: 9 }}>
               {!viewPort?.isMobile ? (
                  <>
                     <Group justify="space-between" mb="sm" py="0">
                        <Box>
                           <Text size="lg" fw={600}>
                              <I18nLabel label="text.modules" />
                           </Text>
                           <Text size="sm" c="dimmed">
                              <I18nLabel label="text.learn.from.guide" />
                           </Text>
                        </Box>
                        <TextInput
                           variant="filled"
                           size="sm"
                           placeholder="Search Module by Name"
                           leftSection={<IconSearch size={16} />}
                           onChange={e => onSearchModule(e.target.value)}
                           className={styles.searchInput}
                        />
                     </Group>

                     <ModulesHorizontalScroll modules={searchedModules} />
                  </>
               ) : (
                  <>
                     <Box
                        bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))"
                        bdrs="var(--mantine-radius-lg)">
                        <ModuleDisplayComponent hideList={viewPort?.isMobile} />
                     </Box>
                  </>
               )}
            </Grid.Col>

            <Grid.Col span={{ sm: 12, lg: 3 }}>
               <SideActionSection />
            </Grid.Col>
         </Grid>
      </PageContainer>
   )
}
