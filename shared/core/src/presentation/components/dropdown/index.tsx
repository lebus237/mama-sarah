import React from 'react'
import { type FloatingPosition, Menu } from '@mantine/core'
import { I18nLabel } from '@shared/i18n'

export type DropdownItemType = {
   label: string
   icon?: React.ReactNode
   onClick?: () => void
   color?: string
}

export function AppDropdownMenu(props: {
   onToggle?: () => void
   position?: FloatingPosition
   children: React.ReactNode
   dropdownTitle?: React.ReactNode
   dropdownContent?: React.ReactNode
   items?: DropdownItemType[]
}) {
   return (
      <Menu
         position={props.position ?? 'bottom-end'}
         onClose={props.onToggle}
         onOpen={props.onToggle}
      >
         <Menu.Target>{props.children}</Menu.Target>
         {props.items ? (
            <Menu.Dropdown>
               {props.dropdownTitle && <Menu.Label>{props.dropdownTitle}</Menu.Label>}
               {props.items.map((item, index) => (
                  <Menu.Item
                     leftSection={item.icon}
                     key={index}
                     onClick={item.onClick}
                     color={item.color}
                  >
                     <I18nLabel label={item.label} />
                  </Menu.Item>
               ))}
            </Menu.Dropdown>
         ) : (
            <Menu.Dropdown style={{ overflow: 'hidden', padding: 0 }}>
               {props.dropdownContent}
            </Menu.Dropdown>
         )}
      </Menu>
   )
}
