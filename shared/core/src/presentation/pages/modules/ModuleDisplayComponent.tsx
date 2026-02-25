import { Accordion, Box, Flex, Grid, Stack, Text } from '@mantine/core'
// @ts-ignore
import styles from './ModulePage.module.scss'
import { IconPinned } from '@tabler/icons-react'
import { ModuleItem } from './ModuleItem'
import { I18nLabel } from '@shared/i18n'
import { ArrowUpRight } from 'lucide-react'
import { useModules, useViewPort } from '../../../hooks'

export const ModuleDisplayComponent = ({ hideList }: { hideList?: boolean }) => {
   const { pinnedModules, singleModules, groupModules } = useModules()
   const viewPort = useViewPort()

   return (
      <Box className={styles.moduleSectionContainer}>
         <Box className={styles.moduleSectionHeader} p="md">
            <Box>
               <Text fw={500} size="lg">
                  <I18nLabel label="section.modules.title" />
               </Text>
               <Text fw={300} size="sm" c="dimmed">
                  <I18nLabel label="section.modules.description" /> =
                  <I18nLabel label="Select Min. 05 Features to setup your management." />
               </Text>
            </Box>
         </Box>
         <Stack
            gap="lg"
            className={styles.moduleSectionContent}
            px="md"
            py={{ base: 'md', md: 'lg' }}>
            <Box className={styles.pinnedModules}>
               <Accordion
                  defaultValue="pinned"
                  classNames={{
                     root: styles.pinnedModuleAccordion,
                     item: styles.pinnedModuleAccordionItem,
                     control: styles.pinnedModuleAccordionControl,
                  }}>
                  <Accordion.Item value="pinned" bottom={0}>
                     <Accordion.Control icon={<IconPinned />}>
                        <Text fw={500}>
                           <I18nLabel label="text.pinned.modules" />
                        </Text>
                     </Accordion.Control>
                     <Accordion.Panel>
                        <Grid className={styles.moduleSection} gutter="md">
                           {pinnedModules.map((item, i) => (
                              <Grid.Col key={i} span={{ base: 6, md: 4 }}>
                                 <ModuleItem module={item} isMobile={viewPort?.isMobile} />
                              </Grid.Col>
                           ))}
                        </Grid>
                     </Accordion.Panel>
                  </Accordion.Item>
               </Accordion>
            </Box>
            {!hideList ? (
               <Stack gap="lg" className={styles.allModules}>
                  <Grid className={styles.moduleSection} gutter="md">
                     {singleModules.map((item, i) => (
                        <Grid.Col key={i} span={{ md: 4 }}>
                           <ModuleItem module={item} isMobile={viewPort?.isMobile} />
                        </Grid.Col>
                     ))}
                  </Grid>

                  {groupModules.map((item, key) => (
                     <Grid className={styles.moduleSection} gutter="md" key={key} justify="start">
                        <Grid.Col
                           span={{ md: 12 }}
                           display="flex"
                           className={styles.moduleSectionItemHeader}>
                           <Box mr="xs" className={styles.moduleSectionItemHeaderIcon}>
                              <div>{item.icon}</div>
                           </Box>
                           <Box>
                              <Text fw={700} size="xl" lh={1.3}>
                                 <I18nLabel label={`module.${item.name}`} />
                              </Text>
                              {/*<Text size="12px" c="dimmed">*/}
                              {/*   <I18nLabel label={`module.${item.name}.description`} />*/}
                              {/*</Text>*/}
                           </Box>
                        </Grid.Col>

                        {item?.modules?.map((module, i) => (
                           <Grid.Col key={i} span={{ md: 4 }}>
                              <ModuleItem module={module} />
                           </Grid.Col>
                        ))}
                     </Grid>
                  ))}
               </Stack>
            ) : (
               <a href={''} style={{ textDecoration: 'none' }}>
                  <Flex
                     justify="end"
                     columnGap={2}
                     align="center"
                     c="light-dark(var(--mantine-color-dark-8),var(--mantine-color-gray-4))">
                     <Text fw={500} size="lg">
                        <I18nLabel label="action.see.all.modules" />
                     </Text>
                     <ArrowUpRight />
                  </Flex>
               </a>
            )}
         </Stack>
      </Box>
   )
}
