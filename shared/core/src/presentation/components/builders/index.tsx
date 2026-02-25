import { PageContainer } from '../../layouts'
import type { ContainerProps } from '../../layouts/Container/types'
import { CollectionTable, useAppState, useModals } from '../../../index'
import { Button, Group } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { I18nLabel } from '@shared/i18n'
import type { ZodSchema } from 'zod'
import { type ReactNode } from 'react'
import type { TableColumn } from '../table/AppTable'

export interface WithManagerProps<TSchema extends ZodSchema<any>> extends ContainerProps {
   schema: TSchema
   columns: TableColumn[]
   fetchApi: (query: any) => Promise<any>
   createApi: (query: any) => Promise<any>
   updateApi: (id: string, query: any) => Promise<any>
   fetchElementById: (id: string) => Promise<any>
   buttonLabel?: string
   modalSize?: string
   modalAddLabel?: ReactNode
   modalEditLabel?: ReactNode
   children?: ReactNode
   defaultValues?: any
}

export function WithManager({
   schema,
   columns,
   fetchApi,
   createApi,
   updateApi,
   fetchElementById,
   buttonLabel,
   children,
   modalSize,
   modalAddLabel,
   modalEditLabel,
   defaultValues,
   ...props
}: WithManagerProps<any>) {
   const { refreshCollection } = useAppState()
   const { openModal, closeModal } = useModals()

   const onSubmit = async (payload: any) =>
      await (payload.id ? updateApi(payload.id, payload) : createApi(payload))

   const onSuccess = async (payload: any) => {
      console.log(payload)
      closeModal('APP_MANAGER_MODAL')
      refreshCollection()
   }

   let modalProps = {
      schema: schema,
      content: children,
      size: modalSize ?? '40%',
      onSubmit,
      onSuccess,
      defaultValues,
      fetchElementById,
   }

   return (
      <PageContainer
         {...props}
         pageActions={
            <Group justify="right" gap="xs">
               <Button
                  leftSection={<IconPlus />}
                  onClick={() =>
                     openModal({
                        type: 'APP_MANAGER_MODAL',
                        modalProps: {
                           modalLabel: modalAddLabel ?? 'modal.create',
                           ...modalProps,
                        },
                     })
                  }>
                  <I18nLabel label={buttonLabel ?? 'action.add.element'} />
               </Button>
            </Group>
         }>
         <CollectionTable
            columns={columns}
            fetchApi={fetchApi}
            onRowClick={(record: any) =>
               openModal({
                  type: 'APP_MANAGER_MODAL',
                  modalProps: {
                     id: record.id,
                     modalLabel: modalEditLabel ?? 'modal.update',
                     ...modalProps,
                  },
               })
            }
         />
      </PageContainer>
   )
}
