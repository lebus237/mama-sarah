import { ActionIcon, Box, TextInput } from '@mantine/core'
import { IconHome, IconLayoutGridAdd, IconSearch } from '@tabler/icons-react'
import cx from 'clsx'
import _ from 'lodash'

// @ts-ignore
import classes from './styles/Navbar.module.scss'

import { useTranslate } from '@shared/i18n'
import { useAppState, useModals, useModules, useNavigator } from '../../../../../hooks'
import NavbarAction from './NavbarAction'
import NavbarContext from './NavbarContext'
import { MegaMenu } from '../components/MegaMenu'
import type { AppLayoutProps } from '../../index'

const matchesModulePath = (path: string, key: string) =>
   path.split(/[\/-]/).filter(Boolean).includes(key)

export const DesktopNavbar = ({ logoutPath, ...props }: AppLayoutProps) => {
   const { openModal } = useModals()
   const { pinnedModules } = useModules()
   const { path, navigate } = useNavigator()
   const {
      context: { context },
   } = useAppState()

   const { trans } = useTranslate()

   return (
      <Box className={classes.navbar}>
         <div className={classes.container}>
            <Box className={classes.navbarApp}>
               <NavbarContext
                  context={context}
                  fetchCompanies={props.fetchCompanies}
                  changeContext={props.changeContext}
                  fetchLocations={props.fetchLocations}
               />
               <Box className={classes.navbarModules}>
                  <Box className={classes.visibleModules}>
                     <Box mx="xs" className={classes.viewModules}>
                        <ActionIcon
                           variant="transparent"
                           onClick={() => navigate('/')}
                           className={classes['module-icon']}>
                           <IconHome />
                        </ActionIcon>
                     </Box>
                     <Box mr="xs" className={classes.viewModules}>
                        <MegaMenu>
                           <ActionIcon variant="transparent" className={classes['module-icon']}>
                              <IconLayoutGridAdd />
                           </ActionIcon>
                        </MegaMenu>
                     </Box>
                     {pinnedModules?.map((module, index) => (
                        <Box
                           key={index}
                           onClick={() => navigate(module.path, {}, true)}
                           className={cx(classes.moduleItem, {
                              [classes.moduleItemActive]: matchesModulePath(path, module?.key),
                           })}>
                           <div className={classes['module-content']}>
                              <div className={classes['module-icon']}>
                                 {module?.icon && <module.icon stroke={1.5} size={15} />}
                              </div>
                              <div className={classes['module-name']}>
                                 {_.truncate(trans(`menu.${module?.name}`), {
                                    length: 20,
                                 })}
                              </div>
                           </div>
                        </Box>
                     ))}
                  </Box>

                  <Box className={classes.searchMenu}>
                     <TextInput
                        variant="filled"
                        size="sm"
                        onFocus={() => openModal({ type: 'SEARCH_MODULE_MODAL' })}
                        placeholder="Search Module by Name"
                        leftSection={<IconSearch size={16} />}
                     />
                  </Box>
               </Box>
            </Box>

            <NavbarAction logoutPath={logoutPath} quickActions={props.quickActions} />
         </div>
      </Box>
   )
}
