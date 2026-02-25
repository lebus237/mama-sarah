// @ts-ignore
import styles from './styles/MobileHeaderContainer.module.scss'
import React from 'react'

export function MobileHeaderContainer({ children }: { children: React.ReactNode }) {
   return <header className={styles.container}>{children}</header>
}
