import { TextInput, ScrollArea, Text, Box } from '@mantine/core'

// @ts-ignore
import styles from './ModuleModal.module.scss'
import { I18nLabel } from '@shared/i18n'
import type { ModalComponentProps } from '../withModal'
import { useModules, useNavigator } from '../../../../hooks'
import { withModal } from '../index'

function SearchModuleModal(props: ModalComponentProps) {
   const { navigate } = useNavigator()
   const { searchedModules, onSearchModule } = useModules()

   return (
      <>
         <TextInput
            placeholder="Search by name or description..."
            onChange={event => onSearchModule(event.currentTarget.value)}
            mb="md"
         />

         <ScrollArea style={{ height: '60vh' }}>
            {searchedModules.length === 0 ? (
               <Text c="dimmed" mt="md">
                  No modules found
               </Text>
            ) : (
               <Box>
                  {searchedModules.map(module => (
                     <Box
                        p="3%"
                        display="flex"
                        className={styles.moduleModalItem}
                        onClick={() => {
                           navigate(module.path)
                           props.onClose()
                        }}>
                        <Box className={styles.moduleModalIconBox} mr="md">
                           <div className={styles.moduleModalIcon}>
                              {module.icon && <module.icon stoke={1.1} />}
                           </div>
                        </Box>
                        <Box my="auto">
                           <Text fw={700} size="md">
                              <I18nLabel label={`module.${module.name}`} />
                           </Text>
                           <Text fw={400} size="xs" c="dimmed">
                              <I18nLabel label={`module.${module.name}.description`} />
                           </Text>
                        </Box>
                     </Box>
                  ))}
               </Box>
            )}
         </ScrollArea>
      </>
   )
}

export default withModal<ModalComponentProps>('text.search.modules', {
   size: '30%',
})(SearchModuleModal)
