// @ts-ignore
import classes from '../MobileLayout.module.scss'
import { ActionIcon, Box } from '@mantine/core'
import { IconLayoutGridAdd } from '@tabler/icons-react'
import { useModules, useNavigator } from '../../../../../hooks'
import clsx from 'clsx'

export const MobileNavbarComponent = ({}) => {
   const { parentModules } = useModules()
   const { navigate } = useNavigator()

   return (
      <>
         <Box className={classes.mobileNavbar}>
            <nav className={classes.container}>
               {Array.from({ length: 5 }).map((_, idx) => {
                  let module = parentModules[idx < 2 ? idx : idx - 1]

                  return idx !== 2 ? (
                     <div
                        onClick={() => navigate(module.path)}
                        key={module.name}
                        // className={clsx(classes.navItem, {
                        //    [classes.active]: path == module.path,
                        // })}
                     >
                        <div className={classes.icon}>
                           {module.icon}
                           <span>{module.name}</span>
                        </div>
                     </div>
                  ) : (
                     <div key="middle" className={clsx(classes.navItem)}></div>
                  )
               })}
            </nav>
         </Box>
         <div className={classes.moduleAction}>
            <ActionIcon
               variant="transparent"
               onClick={() => navigate('')}
               className={classes['module-icon']}
            >
               <IconLayoutGridAdd size={30} />
            </ActionIcon>
         </div>
      </>
   )
}
