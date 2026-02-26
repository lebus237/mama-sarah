import { withModal } from '../index'
import { FormWrapper } from '../../forms'
import { useEffect, useState } from 'react'

function AppManagerModal(props: any) {
   const { id, content, schema, onSubmit, onSuccess, defaultValues, fetchElementById } =
      props.modalProps

   const [value, setValue] = useState<any | undefined>(defaultValues)

   useEffect(() => {
      if (id) {
         ;(async () => {
            let response = await fetchElementById(id)
            if (response?.data) {
               setValue(response.data)
            }
         })()
      }
   }, [id])

   return (
      <FormWrapper
         schema={schema}
         onSuccess={onSuccess}
         defaultValues={value}
         onSubmit={payload => onSubmit?.(id ? { id, ...payload } : payload)}
      >
         {content}
      </FormWrapper>
   )
}

export default withModal('', {
   size: 'md',
   padding: 'xs',
})(AppManagerModal)
