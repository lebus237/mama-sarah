import { Outlet } from 'react-router-dom'

// @ts-ignore
import styles from './DesktopLayout.module.scss'
import { DesktopNavbar } from './navbar'
import type { AppLayoutProps } from '../index'

export default function DesktopLayout(props: AppLayoutProps) {
   return (
      <div className={styles.app}>
         <DesktopNavbar {...props} />
         <Outlet />
      </div>
   )
}
