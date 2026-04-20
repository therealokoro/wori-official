<script lang="ts" setup>
import type { EditorToolbarItem } from '@nuxt/ui'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const content = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val ?? '')
})

const items: EditorToolbarItem[][] = [
  [
    { kind: 'undo', icon: 'i-lucide-undo', tooltip: { text: 'Undo' } },
    { kind: 'redo', icon: 'i-lucide-redo', tooltip: { text: 'Redo' } }
  ],
  [
    {
      icon: 'i-lucide-heading',
      tooltip: { text: 'Text Style' },
      content: { align: 'start' },
      items: [
        { kind: 'paragraph',        icon: 'i-lucide-type',      label: 'Paragraph' },
        { kind: 'heading', level: 1, icon: 'i-lucide-heading-1', label: 'Heading 1' },
        { kind: 'heading', level: 2, icon: 'i-lucide-heading-2', label: 'Heading 2' },
        { kind: 'heading', level: 3, icon: 'i-lucide-heading-3', label: 'Heading 3' }
      ]
    }
  ],
  [
    { kind: 'mark', mark: 'bold',      icon: 'i-lucide-bold',          tooltip: { text: 'Bold' } },
    { kind: 'mark', mark: 'italic',    icon: 'i-lucide-italic',        tooltip: { text: 'Italic' } },
    { kind: 'mark', mark: 'underline', icon: 'i-lucide-underline',     tooltip: { text: 'Underline' } },
    { kind: 'mark', mark: 'strike',    icon: 'i-lucide-strikethrough', tooltip: { text: 'Strikethrough' } }
  ],
  [
    { kind: 'bulletList',  icon: 'i-lucide-list',         tooltip: { text: 'Bullet List' } },
    { kind: 'orderedList', icon: 'i-lucide-list-ordered', tooltip: { text: 'Numbered List' } }
  ],
  [
    { kind: 'blockquote',      icon: 'i-lucide-text-quote',           tooltip: { text: 'Blockquote' } },
    { kind: 'horizontalRule',  icon: 'i-lucide-separator-horizontal', tooltip: { text: 'Divider' } },
    { kind: 'clearFormatting', icon: 'i-lucide-remove-formatting',    tooltip: { text: 'Clear Formatting' } }
  ],
  [
    { kind: 'link', icon: 'i-lucide-link', tooltip: { text: 'Link' } }
  ]
]
</script>

<template>
  <UEditor
    v-slot="{ editor }"
    v-model="content"
    content-type="html"
    :ui="{
      root: 'flex flex-col',
      content: 'overflow-y-auto max-h-[480px]',
      base: 'min-h-48 [&_p]:my-1 [&_h1]:my-2 [&_h2]:my-2 [&_h3]:my-2'
    }"
    placeholder="Start typing the article content"
    class="article-editor w-full border border-gray-300 rounded-md"
  >
    <UEditorToolbar
      :editor="editor"
      :items="items"
      class="px-2 py-1 border-b border-gray-300 overflow-x-auto shrink-0"
    />
  </UEditor>
</template>

<style>
/* Override the default sm:px-8 padding that UEditor applies to .tiptap */
.article-editor .tiptap {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
}
</style>