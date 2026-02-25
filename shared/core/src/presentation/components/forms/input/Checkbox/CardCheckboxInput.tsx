import { Checkbox, Group, Text } from '@mantine/core'

// @ts-ignore
import classes from './Checkbox.module.scss'
import { I18nLabel } from '@shared/i18n'

export interface CardCheckboxInputType {
   name?: any
   value?: any
   label?: any
   placeholder?: any
   onChange?: (props?: any) => void
   errorMessage?: string
}

function CardCheckboxInput(props: CardCheckboxInputType) {
   return (
      <Checkbox.Card
         className={classes.root}
         radius="md"
         name={props.name}
         checked={props.value ?? false}
         onClick={() => props.onChange?.(!(props.value ?? false))}>
         <Group wrap="nowrap" align="flex-start">
            <Checkbox.Indicator />
            <div>
               <Text className={classes.label}>
                  <I18nLabel label={props.label} />
               </Text>
               <Text className={classes.description}>
                  <I18nLabel label={props.placeholder} />
               </Text>
            </div>
         </Group>
      </Checkbox.Card>
   )
}

export default CardCheckboxInput
