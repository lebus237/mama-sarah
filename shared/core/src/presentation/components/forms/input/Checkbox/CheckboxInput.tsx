import { Checkbox } from '@mantine/core'

export interface CheckboxInputType {
   name?: any
   value?: any
   label?: any
   placeholder?: any
   onChange?: (props?: any) => void
   errorMessage?: string
}

function CheckboxInput(props: CheckboxInputType) {
   return (
      <Checkbox
         radius="md"
         name={props.name}
         checked={props.value ?? false}
         onClick={() => props.onChange?.(!(props.value ?? false))}
         label={props.label}
         description={props.placeholder}
      />
   )
}

export default CheckboxInput
