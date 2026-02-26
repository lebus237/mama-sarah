// @ts-ignore
import classes from './styles/NavbarContext.module.scss'

import _ from 'lodash'
import type { AppContextType } from '../../../../../types'
import { Box, Button, LoadingOverlay, Text, Tooltip } from '@mantine/core'
import { IconChevronDown, IconCirclePlus, IconEye, IconSettings } from '@tabler/icons-react'
import { AppDropdownMenu } from '../../../../components/dropdown'
import { AppAsyncSelectInput } from '../../../../components/forms'
import { I18nLabel, useTranslate } from '@shared/i18n'
import { getLetters } from '../../../../../lib/helpers'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppState, useNavigator } from '../../../../../hooks'

function NavbarContext({
   context,
   fetchCompanies,
   fetchLocations,
   changeContext,
}: {
   context: AppContextType
   fetchCompanies: any
   fetchLocations: (id: string) => any
   changeContext: (id: string) => any
}) {
   const { trans } = useTranslate()
   const { navigate } = useNavigator()
   const [orgId, setOrgId] = useState(context?.companyId)
   const { instance } = useAppState()
   const appLogo = instance?.asset?.logo ?? '/logo-2.svg'

   useEffect(() => {
      setOrgId(context?.companyId)
   }, [context?.companyId])

   const { data: resp, isLoading } = useQuery({
      queryKey: ['fetchLocations', orgId],
      queryFn: () => fetchLocations(orgId)(),
      enabled: !!orgId,
      staleTime: 0,
   })

   // @ts-ignore
   const data = resp?.data as any

   return (
      <AppDropdownMenu
         dropdownContent={
            <Box className={classes.navbarContextDropdown}>
               <Box miw="95%" mx="auto">
                  <img src={appLogo} alt=",," />
               </Box>
               <Box miw="95%" mx="auto">
                  <AppAsyncSelectInput fetchApi={fetchCompanies} value={orgId} />
               </Box>
               <Box miw="95%" mx="auto">
                  <Box w="30%">
                     <Tooltip label={trans('text.view.company')}>
                        <Button w="100%" onClick={() => navigate('/company')}>
                           <IconEye stroke={1.1} />
                        </Button>
                     </Tooltip>
                  </Box>
                  <Box w="30%">
                     <Tooltip label={trans('text.organisation.setting')}>
                        <Button w="100%" onClick={() => navigate('/company')}>
                           <IconSettings stroke={1.1} />
                        </Button>
                     </Tooltip>
                  </Box>
                  <Box w="30%">
                     <Tooltip label={trans('text.create.new.company')}>
                        <Button w="100%" onClick={() => navigate('/company/create')}>
                           <IconCirclePlus stroke={1.1} />
                        </Button>
                     </Tooltip>
                  </Box>
               </Box>
               <Box miw="100%">
                  {isLoading && (
                     <LoadingOverlay
                        zIndex={1000}
                        overlayProps={{ radius: 'sm', blur: 1 }}
                        visible={isLoading ?? false}
                        loaderProps={{ color: 'default', type: 'dots' }}
                     />
                  )}
                  {data?.map((item: any, i: any) => (
                     <Box
                        miw="100%"
                        key={i}
                        onClick={() => changeContext(item.contextId)}
                        data-active={item.id === context?.locationId || undefined}
                        className={classes.navbarContextDropdownItem}
                     >
                        <Box className={classes.navbarContextBox}>
                           <span>{getLetters(item.name)}</span>
                        </Box>
                        <div>
                           <Text size="sm" fw={600}>
                              {item.name}
                           </Text>
                           <Text size="xs" lineClamp={1}>
                              <I18nLabel label={`module..description`} />
                           </Text>
                        </div>
                     </Box>
                  ))}
                  <Box w="100%" mt="sm">
                     <Tooltip label={trans('text.add.new.locations')}>
                        <Button w="100%">
                           <IconCirclePlus stroke={1.1} />{' '}
                           <I18nLabel label="text.add.new.locations" />
                        </Button>
                     </Tooltip>
                  </Box>
               </Box>
            </Box>
         }
      >
         <Box variant="transparent" className={classes.navbarContext}>
            <Box bg="default.7" className={classes.contextColor}>
               <span>{getLetters(context?.locationName)}</span>
            </Box>
            <Box className={classes.contextCard}>
               <Box className={classes.contextName}>
                  <Text size="15px">{_.truncate(context?.locationName, { length: 20 })}</Text>
                  <Text size="12px" c="dimmed">
                     {_.truncate(context?.companyName, { length: 20 })}
                  </Text>
               </Box>
               <Box>
                  <IconChevronDown size={18} />
               </Box>
            </Box>
         </Box>
      </AppDropdownMenu>
   )
}

export default NavbarContext
