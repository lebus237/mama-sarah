import React, { useState } from 'react'
import { UnstyledButton, Text, SimpleGrid, Menu, Box } from '@mantine/core'
// @ts-ignore
import classes from './MegaMenu.module.scss'
import { useModules, useNavigator, useViewPort } from '../../../../../hooks'
import { I18nLabel } from '@shared/i18n'
import { IconDashboard } from '@tabler/icons-react'

export function MegaMenu({ children }: { children: React.ReactNode }) {
   const viewPort = useViewPort()
   const { navigate } = useNavigator()
   const { groupModules, singleModules } = useModules()
   const [activeModuleId, setActiveModuleId] = useState('modules')
   const [open, setOpen] = useState(false)

   let appModules = [
      {
         key: 'modules',
         name: 'modules',
         icon: IconDashboard,
         children: singleModules,
      },
      ...groupModules,
   ]

   const activeModule = appModules.find(m => m.name === activeModuleId) || appModules[0]

   return (
      <Menu
         position={viewPort.isTablet ? 'bottom' : 'bottom-start'}
         width={viewPort.isTablet ? '98%' : '60%'}
         opened={open}
         onChange={setOpen}>
         <Menu.Target>{children}</Menu.Target>

         <Menu.Dropdown style={{ overflow: 'hidden', padding: 0 }}>
            <div className={classes.megaMenuWrapper}>
               {/* 30% Sidebar */}
               <aside className={classes.modulesSidebar}>
                  {appModules.map(module => (
                     <UnstyledButton
                        key={module.name}
                        className={classes.sidebarItem}
                        data-active={activeModuleId === module.name || undefined}
                        onMouseEnter={() => setActiveModuleId(module.name)}>
                        {module?.icon && <module.icon stroke={1.1} size={25} />}
                        <div>
                           <Text size="sm" fw={600}>
                              <I18nLabel label={`module.${module.name}`} />
                           </Text>
                           <Text size="xs" lineClamp={1}>
                              <I18nLabel label={`module.${module.name}.description`} />
                           </Text>
                        </div>
                     </UnstyledButton>
                  ))}
               </aside>

               {/* 70% Content */}
               <main className={classes.menuContent}>
                  <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="md">
                     <I18nLabel label={`module.${activeModule.name}`} />
                  </Text>
                  <SimpleGrid cols={2} spacing="md">
                     {activeModule?.children?.map(item => (
                        <Box
                           key={item.name}
                           className={classes.menuItem}
                           onClick={() => {
                              navigate(item.path)
                              setOpen(false)
                           }}>
                           {item?.icon && (
                              <Box className={classes.menuItemBox}>
                                 <item.icon stroke={1.1} size={20} />
                              </Box>
                           )}
                           <Box className={classes.menuItemContent}>
                              <Text size="sm" fw={600} mb={2}>
                                 <I18nLabel label={`module.${item.name}`} />
                              </Text>
                              <Text size="xs" c="dimmed">
                                 <I18nLabel label={`module.${item.name}.description`} />
                              </Text>
                           </Box>
                        </Box>
                     ))}
                  </SimpleGrid>

                  <div className={classes.footer}>
                     {/*<Group justify="space-between">*/}
                     {/*   <Text size="xs" c="dimmed">Need help choosing a plan?</Text>*/}
                     {/*   <Anchor size="xs" fw={700} underline="always">View Pricing</Anchor>*/}
                     {/*</Group>*/}
                  </div>
               </main>
            </div>
         </Menu.Dropdown>
      </Menu>
   )
}
