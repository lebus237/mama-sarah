import { Group, Stack, Text, Title } from '@mantine/core'
import { IconCircleDot } from '@tabler/icons-react'
import { I18nLabel } from '@shared/i18n'

export function ListViewComponent({
   title,
   lists,
}: {
   title?: string
   lists: { icon?: any; label: any; value: any }[]
}) {
   return (
      <Stack gap="5px">
         {title && (
            <Title order={5} fw="normal" mb="sm" c="gray">
               {title}
            </Title>
         )}

         {lists.map((item, index) => (
            <Group key={index} gap="xs">
               {item.icon ? (
                  <item.icon size={16} color="gray" />
               ) : (
                  <IconCircleDot size={16} color="gray" />
               )}
               <Text size="sm" c="gray.8" fw={300}>
                  <I18nLabel label={item.label} /> :
               </Text>
               <Text size="sm">{item.value}</Text>
            </Group>
         ))}
      </Stack>
   )
}
