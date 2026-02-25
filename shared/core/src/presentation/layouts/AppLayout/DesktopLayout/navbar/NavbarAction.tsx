import { Avatar, Box, UnstyledButton, useMantineColorScheme, ActionIcon } from '@mantine/core'
// @ts-ignore
import classes from './styles/NavbarAction.module.scss'
import {
   IconLanguage,
   IconLogout,
   IconMoon,
   IconPlus,
   IconSettings,
   IconSun,
} from '@tabler/icons-react'
import { useModals, useNavigator } from '../../../../../hooks'
import { AppDropdownMenu, type DropdownItemType } from '../../../../components/dropdown'

function NavbarAction({
   logoutPath,
   quickActions,
}: {
   logoutPath: string
   quickActions: DropdownItemType[]
}) {
   const { navigate } = useNavigator()
   const { openModal } = useModals()
   const { colorScheme, toggleColorScheme } = useMantineColorScheme()

   const isDark = colorScheme === 'dark'

   return (
      <Box className={classes.navbarActions}>
         <Box mx="sm" className={classes.actionItem}>
            <AppDropdownMenu position="bottom-end" items={quickActions}>
               <ActionIcon color="default.6" size="md">
                  <IconPlus size={20} stroke={1.5} />
               </ActionIcon>
            </AppDropdownMenu>
         </Box>
         <Box mr="sm" ml="xs">
            <AppDropdownMenu
               items={[
                  {
                     label: 'menu.account.settings',
                     icon: <IconSettings size={18} stroke={1.75} />,
                     onClick: () => navigate('/profile'),
                  },
                  {
                     label: 'menu.change.language',
                     icon: <IconLanguage size={18} stroke={1.75} />,
                     onClick: () => openModal({ type: 'CHANGE_LANGUAGE_MODAL' }),
                  },
                  {
                     label: `menu.switch_to.${isDark ? 'light' : 'dark'}.mode`,
                     icon: isDark ? <IconSun size={16} /> : <IconMoon size={16} />,
                     onClick: () => toggleColorScheme(),
                  },
                  {
                     label: `menu.logout`,
                     icon: <IconLogout size={16} stroke={1.5} />,
                     onClick: () => navigate(logoutPath),
                     color: 'red',
                  },
               ]}>
               <Box className={classes.contextBox}>
                  <UnstyledButton className={classes.user}>
                     <Avatar
                        src="https://api.dicebear.com/7.x/personas/svg?seed=Eden"
                        size={30}
                        radius="50%"
                        variant="filled"
                        color="gray"
                     />
                  </UnstyledButton>
               </Box>
            </AppDropdownMenu>
         </Box>
      </Box>
   )
}

export default NavbarAction
