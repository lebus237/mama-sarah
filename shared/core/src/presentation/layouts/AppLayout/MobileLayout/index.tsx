import { Outlet } from 'react-router-dom'
import { Box } from '@mantine/core'

// @ts-ignore
import { MobileNavbarComponent } from './navbar/MobileNavbarComponent'

function MobileLayout(props: { logoutPath: string; modulePath: string }) {
   console.log(props)
   return (
      <Box>
         <Outlet />
         <MobileNavbarComponent />
      </Box>
   )
}

export default MobileLayout
