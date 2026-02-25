import React from 'react'
import { randomString } from '@shared/core'
import { Flex } from '@mantine/core'

export function asGroupInput(
   handleGroupChange: (target: any, value: any) => void,
   ...props: any[]
) {
   return (...wrappedComponents: React.ReactElement[]) => {
      return (
         <Flex gap={10} wrap="wrap">
            {wrappedComponents.map((Component, index: number) => {
               const WrappedComponent = Component.type

               return (
                  <WrappedComponent
                     {...props.at(index)}
                     key={randomString(5)}
                     value={props.at(index).value.current}
                     onChange={(evt: any) =>
                        handleGroupChange(evt.currentTarget.name, evt.target.value)
                     }
                  />
               )
            })}
         </Flex>
      )
   }
}
