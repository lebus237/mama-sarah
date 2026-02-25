import { Group, Text, Image, SimpleGrid, useMantineColorScheme, Box } from '@mantine/core'
import { Dropzone, type DropzoneProps, type FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { I18nLabel } from '@shared/i18n'

export interface UploadInputType extends Partial<DropzoneProps> {
   label?: React.ReactNode
   required?: boolean
}

export default function UploadInput(props: UploadInputType) {
   const [files, setFiles] = useState<FileWithPath[]>([])
   const { colorScheme } = useMantineColorScheme()

   const previews = files.map((file, index) => {
      const imageUrl = URL.createObjectURL(file)
      return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />
   })

   return (
      <Box>
         <Box m="5px 0">
            <Text size="sm" fw={200} c={colorScheme === 'dark' ? 'dark.1' : 'gray.7'}>
               <I18nLabel label={props.label} />
            </Text>
         </Box>
         <Box>
            <Dropzone
               {...props}
               onDrop={setFiles}
               onReject={files => console.log('rejected files', files)}
               maxSize={5 * 1024 ** 2}
               accept={IMAGE_MIME_TYPE}>
               <Group
                  justify="center"
                  gap="xl"
                  mih={220}
                  bg={colorScheme === 'dark' ? 'dark.9' : 'gray.3'}
                  style={{ pointerEvents: 'none', borderRadius: 'var(--mantine-spacing-xs)' }}>
                  <Dropzone.Accept>
                     <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                     <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                     <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                  </Dropzone.Idle>

                  <div>
                     <Text size="xl" inline>
                        Drag images here or click to select files
                     </Text>
                     <Text size="sm" c="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                     </Text>
                  </div>
               </Group>
            </Dropzone>
            <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
               {previews}
            </SimpleGrid>
         </Box>
      </Box>
   )
}
