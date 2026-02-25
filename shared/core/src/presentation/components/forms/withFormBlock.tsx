import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type WithFormBlockProps = {
   name: string
   label?: string
   className?: string
}

export function withFormBlock<T extends object>(Component: React.ComponentType<T>) {
   return function FormBlock(props: T & WithFormBlockProps) {
      const { name, label, ...componentProps } = props
      const {
         control,
         formState: { errors },
      } = useFormContext()

      const fieldError = errors?.[name]?.message as string | undefined
      const isInvalid = Boolean(fieldError)

      return (
         <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
               <Component
                  {...(componentProps as T)}
                  ref={ref}
                  value={value}
                  label={label}
                  onChange={(e: any) => {
                     const newValue = e?.target?.value !== undefined ? e.target.value : e
                     onChange(newValue)
                  }}
                  onBlur={onBlur}
                  isInvalid={isInvalid}
                  errorMessage={fieldError}
                  className={`
                  ${(componentProps as any)?.className || ''}
                  ${isInvalid ? 'is-invalid' : ''}
                  `.trim()}
               />
            )}
         />
      )
   }
}
