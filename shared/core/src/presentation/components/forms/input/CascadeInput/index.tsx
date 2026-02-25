import React, { type JSX } from 'react'
import { asGroupInput } from './GroupInput'
import { ActionIcon, Flex, Grid } from '@mantine/core'
import { randomString } from '../../../../../lib/random_string.helper'
import { IconMinus, IconPlus } from '@tabler/icons-react'

interface CascadeInputProps {
   children: Array<React.ReactNode> | React.ReactNode
   fieldProps: Array<any & { name: string; value: any }>
   name: string
}

export function CascadeInput(props: CascadeInputProps) {
   const { children, fieldProps } = props
   const [fieldArray, setFieldArray] = React.useState<Array<JSX.Element>>()
   const [, setInnerState] = React.useState<Array<Record<any, any>>>([])
   const state = React.useRef<any>('')

   React.useEffect(() => {
      let newObj = {}

      fieldProps.forEach((props: { name: string } & any) => {
         Object.defineProperty(newObj, props.name, { value: undefined, writable: true })
      })

      setInnerState(() => [newObj])

      setFieldArray(() => {
         return [
            asGroupInput(
               handleGroupChange(0),
               ...fieldProps.map((props, index) => ({
                  ...props,
                  value: state,
                  key: randomString(index + 1),
               })),
            )(...(children as any[]).map(child => child.type)),
         ]
      })
   }, [])

   const addField = () => {
      let newObj = {}

      fieldProps.forEach((props: { name: string } & any) => {
         Object.defineProperty(newObj, props.name, { value: undefined, writable: true })
      })

      setInnerState(prevState => {
         return [...prevState, newObj]
      })

      const Field = asGroupInput(
         handleGroupChange(fieldArray?.length ?? 0),
         ...fieldProps.map((props, index) => ({
            ...props,
            value: state,
            key: randomString(index + 1),
         })),
      )(...(children as any[]).map(child => child.type))

      setFieldArray(prev => {
         return [...(prev ?? []), Field]
      })
   }

   const removeField = (index: number) => {
      setFieldArray(prev => {
         prev?.splice(index, 1)
         return [...(prev ?? [])]
      })

      setInnerState(prevState => {
         const newState = prevState

         newState.splice(index, 1)

         return newState
      })
   }

   const handleGroupChange = React.useCallback((index: number) => {
      return (targetName: any, value: any) => {
         setInnerState(prevState => {
            let newState = prevState

            Object.defineProperty(newState[index], targetName, { value: value, writable: true })

            return [...newState]
         })

         state.current = value
      }
   }, [])

   return (
      <Grid>
         {fieldArray?.map((field, index) => (
            <Grid.Col span={12} key={randomString(index + 1)}>
               <Flex columnGap={5} align="center">
                  {field}
                  <ActionIcon variant="transparent" radius="xl">
                     {index > 0 ? (
                        <IconMinus size={40} onClick={() => removeField(index)} />
                     ) : (
                        <IconPlus size={40} onClick={addField} />
                     )}
                  </ActionIcon>
               </Flex>
            </Grid.Col>
         ))}
      </Grid>
   )
}
