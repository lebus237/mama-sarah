'use client'

import { type ComponentType } from 'react'
import styled from 'styled-components'

export const SC_Icon = styled.span<{ size: number | 'auto' }>`
   width: fit-content;
   height: fit-content;
   display: flex;
   flex-direction: column;
   justify-content: center;

   svg {
      width: ${props => props.size}px;
      height: ${props => props.size}px;
   }
`
export function withSize(size: number | 'auto') {
   return (WrappedComponent: ComponentType, props?: any): any => {
      const { style, ...rest } = props ?? {}
      return (
         <SC_Icon size={size} style={style}>
            <WrappedComponent {...rest} />
         </SC_Icon>
      )
   }
}
