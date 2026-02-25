import { Box, Flex, LoadingOverlay, Alert } from '@mantine/core'
import { I18nLabel } from '@shared/i18n'
import { type ReactNode, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import type { TypeOf, ZodSchema } from 'zod'
import { ZodError } from 'zod'

import AppAlert from '../common/Alert'
import { zodResolver } from '@hookform/resolvers/zod'

type FormWrapperProps<TSchema extends ZodSchema<any>> = {
   schema: TSchema
   onSubmit?: (data: TypeOf<TSchema>) => Promise<any> | void
   onSuccess?: (result: any, data: any) => void
   children: ReactNode
   defaultValues?: any
   className?: string
   isLoading?: boolean
   containerClass?: string
   footerAction?: (action: { clearErrors: () => void; clearFields: () => void }) => ReactNode
}

export function FormWrapper<TSchema extends ZodSchema<any>>({
   onSubmit,
   schema,
   onSuccess,
   children,
   defaultValues,
   className,
   containerClass,
   isLoading = false,
   ...props
}: FormWrapperProps<TSchema>) {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | undefined>()
   const [validationErrors, setValidationErrors] = useState<string[]>([])

   const methods = useForm<TypeOf<TSchema>>({
      resolver: zodResolver(schema as any),
      defaultValues,
   })

   useEffect(() => {
      if (defaultValues) {
         methods.reset(defaultValues)
      }
   }, [defaultValues])

   const handleSubmit = async (data: TypeOf<TSchema>) => {
      setError(undefined)
      setValidationErrors([])
      setLoading(true)

      try {
         // Manual validation before submit (extra safety)
         const validationResult = schema.safeParse(data)

         if (!validationResult.success) {
            const zodErrors = validationResult.error.issues.map(
               issue => `${issue.path.join('.')}: ${issue.message}`,
            )
            setValidationErrors(zodErrors)
            setLoading(false)
            return
         }

         const response = await onSubmit?.(data)

         if (response?.errors) {
            Object.entries(response.errors).forEach(([field, message]) => {
               methods.setError(field as any, {
                  type: 'server',
                  message: message as string,
               })
            })
            setLoading(false)
            return
         }

         if (response?.error) {
            setError(response.error.message || 'An unknown error occurred.')
            setLoading(false)
            return
         }

         setLoading(false)
         onSuccess?.(response, data)
      } catch (err: any) {
         setLoading(false)

         // Handle Zod validation errors specifically
         if (err instanceof ZodError) {
            const zodErrors = err.issues.map(issue => {
               const fieldName = issue.path.join('.')
               return `${fieldName}: ${issue.message}`
            })
            setValidationErrors(zodErrors)
         } else {
            setError(err.message || 'Unexpected error')
         }

         throw err
      }
   }

   const clearAllErrors = () => {
      methods.clearErrors()
      setError(undefined)
      setValidationErrors([])
   }

   const clearFields = () => {
      methods.reset()
      clearAllErrors()
   }

   return (
      <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
            <Flex wrap="wrap" pos="relative" className={containerClass}>
               <LoadingOverlay
                  visible={loading || isLoading}
                  zIndex={1000}
                  overlayProps={{ radius: 'sm', blur: 1 }}
                  loaderProps={{ color: 'default', type: 'dots' }}
               />

               {/* Display general server errors */}
               {error && (
                  <Box w="100%" my="xs">
                     <AppAlert type="error" content={error} title="form.error" />
                  </Box>
               )}

               {/* Display validation errors summary */}
               {validationErrors.length > 0 && (
                  <Box w="100%" my="xs">
                     <Alert color="red" title={<I18nLabel label="form.validation.errors" />}>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                           {validationErrors.map((errorMsg, index) => (
                              <li key={index}>{errorMsg}</li>
                           ))}
                        </ul>
                     </Alert>
                  </Box>
               )}

               <Box w="100%">
                  {children}
                  {props.footerAction && (
                     <Box mt="md">
                        {props.footerAction({
                           clearErrors: clearAllErrors,
                           clearFields: clearFields,
                        })}
                     </Box>
                  )}
               </Box>
            </Flex>
         </form>
      </FormProvider>
   )
}
