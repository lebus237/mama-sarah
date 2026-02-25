import { Box, Flex, Image } from '@mantine/core'

// @ts-ignore
import classes from './MobileHeader.module.scss'

export const MobileHeader = () => {
   // const { colorScheme, toggleColorScheme } = useMantineColorScheme()
   // const isDark = colorScheme == 'dark'

   return (
      <Box className={classes.container}>
         <header className={classes.header}>
            <div className={classes.navbarBrand}>
               <Image src="/logo.svg" alt="Logo" height={15} />
            </div>
            <Flex columnGap="sm" align="center">
               {/*<ProfileComponent />*/}
               {/*<NotificationAlert onClick={() => {}} icon={<IconMessage size={20} />} content={4} />*/}
               {/*<Center onClick={toggleColorScheme}>*/}
               {/*   {isDark ? <IconSun size={26} /> : <IconMoon size={26} />}*/}
               {/*</Center>*/}
            </Flex>
         </header>
      </Box>
   )
}
