import type { ModalComponentProps } from './withModal'
import { withModal } from './index'
import { Box, Text } from '@mantine/core'
// @ts-ignore
import classes from './styles/ChangeLanguageModal.module.scss'
import { LanguageNameMapping, useTranslate } from '@shared/i18n'
import { IconCircleCheck } from '@tabler/icons-react'

function ChangeLanguageModal(props: ModalComponentProps) {
   const { changeLanguage, lang } = useTranslate()

   return (
      <Box miw="100%" className={classes.languageBox}>
         {Object.keys(LanguageNameMapping)?.map((item: any, i: any) => (
            <Box
               w="100%"
               key={i}
               onClick={async () => {
                  await changeLanguage(item)
                  props.onClose()
               }}
               className={classes.languageItem}>
               <Box className={classes.languageFlag}>
                  <span>{item?.toUpperCase()}</span>
                  <Text size="sm" fw={600}>
                     {LanguageNameMapping[item]}
                  </Text>
               </Box>
               {item === lang && (
                  <Box>
                     <IconCircleCheck />
                  </Box>
               )}
            </Box>
         ))}
      </Box>
   )
}

export default withModal<ModalComponentProps>('modal.change.language', {
   size: '30%',
})(ChangeLanguageModal)
