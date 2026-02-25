import { Tabs } from '@mantine/core'
import type { ReactNode } from 'react'
// @ts-ignore
import styles from './TabContainer.module.scss'

export interface AppTabsProps {
   children: Array<ReactNode>
   defaultActiveTab?: string
   tabs: Array<{ title: string; key: string; leftIcon?: any }>
}
export function AppTabs({ children, tabs, defaultActiveTab }: AppTabsProps) {
   return (
      <Tabs defaultValue={defaultActiveTab} keepMounted={false} classNames={styles}>
         <Tabs.List>
            {tabs.map(({ title, key, leftIcon }) => (
               <Tabs.Tab value={key} key={key} leftSection={leftIcon}>
                  {title}
               </Tabs.Tab>
            ))}
         </Tabs.List>
         {tabs.map(({ key }, index) => (
            <Tabs.Panel value={key} key={key}>
               {children[index]}
            </Tabs.Panel>
         ))}
      </Tabs>
   )
}
