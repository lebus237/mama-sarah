// @ts-ignore
import '@mantine/tiptap/styles.css'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import { Box, Text, useMantineColorScheme } from '@mantine/core'
import { I18nLabel } from '@shared/i18n'

export type TextEditorProps = {
   name?: any
   value?: any
   onChange?: (props?: any) => void
   height?: number | string
   label?: string
   placeholder?: string
}

export default function TextEditorInput(props: TextEditorProps) {
   const { colorScheme } = useMantineColorScheme()

   const editor = useEditor(
      {
         extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
         ],
         content: props.value,
         onUpdate: ({ editor }) => {
            props.onChange?.(editor.getHTML())
         },
      },
      [props.value],
   )

   return (
      <Box>
         <Box>
            <Text size="sm" fw={200} c={colorScheme === 'dark' ? 'dark.1' : 'gray.7'}>
               <I18nLabel label={props.label as string} />
            </Text>
         </Box>
         <Box>
            <RichTextEditor
               style={{
                  minHeight: props.height ?? 200,
                  borderColor: 'var(--mantine-color-gray-3)',
               }}
               editor={editor}
               bdrs="sm"
               onChange={c => console.log('EDITOR CHANGED', c.target)}
            >
               <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                  <RichTextEditor.ControlsGroup>
                     <RichTextEditor.Bold />
                     <RichTextEditor.Italic />
                     <RichTextEditor.Underline />
                     <RichTextEditor.Strikethrough />
                     <RichTextEditor.ClearFormatting />
                     <RichTextEditor.Highlight />
                     <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                     <RichTextEditor.H1 />
                     <RichTextEditor.H2 />
                     <RichTextEditor.H3 />
                     <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                     <RichTextEditor.Blockquote />
                     <RichTextEditor.Hr />
                     <RichTextEditor.BulletList />
                     <RichTextEditor.OrderedList />
                     <RichTextEditor.Subscript />
                     <RichTextEditor.Superscript />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                     <RichTextEditor.Link />
                     <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                     <RichTextEditor.AlignLeft />
                     <RichTextEditor.AlignCenter />
                     <RichTextEditor.AlignJustify />
                     <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                     <RichTextEditor.Undo />
                     <RichTextEditor.Redo />
                  </RichTextEditor.ControlsGroup>
               </RichTextEditor.Toolbar>

               <RichTextEditor.Content />
            </RichTextEditor>
         </Box>
      </Box>
   )
}
