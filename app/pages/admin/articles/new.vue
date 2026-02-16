<script lang="ts" setup>
import type { EditorToolbarItem, FormSubmitEvent } from '@nuxt/ui'
import type { z } from 'zod'

type Schema = z.output<typeof CreateArticleSchema>
const state = reactive({ title: undefined, description: undefined, content: undefined, coverImage: undefined })

const items: EditorToolbarItem[] = [
  { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' },
  { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' },
  { kind: 'heading', level: 1, icon: 'i-lucide-heading-1' },
  { kind: 'heading', level: 2, icon: 'i-lucide-heading-2' },
  { kind: 'textAlign', align: 'left', icon: 'i-lucide-align-left' },
  { kind: 'textAlign', align: 'center', icon: 'i-lucide-align-center' },
  { kind: 'bulletList', icon: 'i-lucide-list' },
  { kind: 'orderedList', icon: 'i-lucide-list-ordered' },
  { kind: 'blockquote', icon: 'i-lucide-quote' },
  { kind: 'link', icon: 'i-lucide-link' }
]

const toast = useToast()
const { $orpc } = useNuxtApp()
const mutation = useMutation($orpc.articles.add.mutationOptions())
const isLoading = computed(() => Boolean(mutation.isPending.value))
async function onSubmit(event: FormSubmitEvent<Schema>) {
  mutation.mutate({ ...event.data }, {
    onSuccess() {
      toast.add({ title: 'Success', description: 'Article published successfully', color: 'success' })
    },
    onError(e) {
      toast.add({ title: 'Error', description: e.message, color: 'error' })
    },
  })
}
</script>

<template>
  <Page no-header title="Create New Article">
    <div class="mb-5">
      <ui-text type="title">
        Create Article
      </ui-text>
      <ui-text type="small">
        Fill the form below to create a new article.
      </ui-text>
    </div>

    <UForm :schema="CreateArticleSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="grid lg:grid-cols-5 gap-5">
        <div class="col-span-1 lg:col-span-2 space-y-5">
          <UFormField label="Title" name="title">
            <UInput
              v-model="state.title"
              placeholder="A simple title for the article"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Description" name="description">
            <UInput
              v-model="state.description"
              placeholder="A short sentence that best describes the article"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Cover Image" name="coverImage" hint="Max Size: 2MB">
            <UFileUpload
              v-model="state.coverImage"
              description="Upload an image for the article cover"
              accept="image/*"
              class="w-full"
            />
          </UFormField>
        </div>

        <div class="col-span-1 lg:col-span-3 gap-5">
          <UFormField label="Content" name="description" description="The content of the article goes here">
            <UEditor
              v-slot="{ editor }"
              v-model="state.content"
              content-type="html"
              :ui="{ content: 'min-h-50', base: '' }"
              placeholder="Start typing the article content"
              class="w-full min-h-21 border border-gray-300 rounded-md p-1"
            >
              <UEditorToolbar :editor="editor" :items="items" class="pb-1 border-b border-gray-300" />
            </UEditor>
          </UFormField>

          <UButton type="submit" block class="py-3" :loading="isLoading">
            Publish Article
          </UButton>
        </div>
      </div>
    </UForm>
  </Page>
</template>
