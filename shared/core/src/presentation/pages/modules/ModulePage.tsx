// @ts-ignore
import styles from './ModulePage.module.scss'

import { Accordion, Box, Grid, Text } from '@mantine/core'
import { I18nLabel } from '@shared/i18n'
import { IconPinned } from '@tabler/icons-react'
import { useModules, useNavigator } from '../../../hooks'
import { PageContainer } from '../../layouts'
import type { ModuleItemType } from '../../../types'

function ModuleItem(props: { module: ModuleItemType }) {
   const { navigate } = useNavigator()

   return (
      <Box className={styles.moduleSectionItem} onClick={() => navigate(props.module.path)}>
         <Box className={styles.moduleIconBox} mr="md">
            <div className={styles.moduleIcon}>{props.module.icon}</div>
         </Box>
         <Box my="auto">
            <Text fw={700} size="sm">
               <I18nLabel label={`module.${props.module.name}`} />
            </Text>
            <Text fw={400} size="xs" c="dimmed">
               <I18nLabel label={`module.${props.module.name}.description`} />
            </Text>
         </Box>
      </Box>
   )
}

function ModulePage() {
   const { pinnedModules, singleModules, groupModules } = useModules()

   return (
      <PageContainer>
         <Box className={styles.moduleSectionContainer}>
            <Box className={styles.moduleSectionHeader}>
               <Box my="auto">
                  <Text fw={500} size="lg">
                     <I18nLabel label="Our Features / Modules" />
                  </Text>
                  <Text fw={300} size="sm" c="dimmed">
                     <I18nLabel label="Select Min. 05 Features to setup your management." />
                  </Text>
               </Box>
            </Box>
            <Box className={styles.moduleSectionContent}>
               <Box className={styles.pinnedModules}>
                  <Accordion
                     defaultValue="pinned"
                     classNames={{
                        root: styles.pinnedModuleAccordion,
                        item: styles.pinnedModuleAccordionItem,
                     }}
                  >
                     <Accordion.Item value="pinned" bottom={0}>
                        <Accordion.Control icon={<IconPinned />}>Epingles</Accordion.Control>
                        <Accordion.Panel>
                           <Grid className={styles.moduleSection} gutter="md">
                              {pinnedModules.map((item, i) => (
                                 <Grid.Col key={i} span={{ md: 4 }}>
                                    <ModuleItem module={item} />
                                 </Grid.Col>
                              ))}
                           </Grid>
                        </Accordion.Panel>
                     </Accordion.Item>
                  </Accordion>
               </Box>
               <Box className={styles.allModules}>
                  <Grid className={styles.moduleSection} gutter="md">
                     {singleModules.map((item, i) => (
                        <Grid.Col key={i} span={{ md: 4 }}>
                           <ModuleItem module={item} />
                        </Grid.Col>
                     ))}
                  </Grid>

                  {groupModules.map((item, key) => (
                     <Grid className={styles.moduleSection} gutter="md" key={key} justify="start">
                        <Grid.Col
                           span={{ md: 12 }}
                           display="flex"
                           className={styles.moduleSectionItemHeader}
                        >
                           <Box mr="xs" className={styles.moduleSectionItemHeaderIcon}>
                              <div>{item.icon}</div>
                           </Box>
                           <Box>
                              <Text fw={700} size="xl" lh={1.3}>
                                 <I18nLabel label={`module.${item.name}`} />
                              </Text>
                              <Text size="12px" c="dimmed">
                                 <I18nLabel label={`module.${item.name}.description`} />
                              </Text>
                           </Box>
                        </Grid.Col>

                        {item?.modules?.map((module, i) => (
                           <Grid.Col key={i} span={{ md: 4 }}>
                              <ModuleItem module={module} />
                           </Grid.Col>
                        ))}
                     </Grid>
                  ))}
               </Box>
            </Box>
         </Box>
      </PageContainer>
   )
}

export default ModulePage
