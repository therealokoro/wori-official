<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { z } from 'zod'

type Schema = z.output<typeof CreateArticleSchema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  description: undefined,
  content: undefined,
  coverImage: undefined
})

const toast = useToast()
const { $orpc } = useNuxtApp()
const mutation = useMutation($orpc.articles.add.mutationOptions())

async function onSubmit(event: FormSubmitEvent<Schema>) {
  mutation.mutate(event.data, {
    onSuccess() {
      toast.add({ title: 'Article published successfully', color: 'success' })
      navigateTo('/admin/articles')
    },
    onError(e) {
      toast.add({ title: 'Failed to publish article', description: e.message, color: 'error' })
    }
  })
}
</script>

<template>
  <DashboardPage title="Create New Article">
    <div class="mb-5">
      <ui-text type="title">Create Article</ui-text>
      <ui-text type="small">Fill the form below to create a new article.</ui-text>
    </div>

    <UForm :schema="CreateArticleSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="grid lg:grid-cols-5 gap-5">
        <div class="col-span-1 lg:col-span-2 space-y-5">
          <UFormField label="Title" name="title">
            <UInput v-model="state.title" placeholder="A simple title for the article" class="w-full" />
          </UFormField>

          <UFormField label="Description" name="description">
            <UTextarea
              v-model="state.description"
              placeholder="A short sentence that best describes the article"
              class="w-full"
              :rows="3"
              autoresize
            />
          </UFormField>

          <UFormField label="Cover Image" name="coverImage" hint="Max size: 2MB">
            <ArticleCoverUpload v-model="state.coverImage" />
          </UFormField>
        </div>

        <div class="col-span-1 lg:col-span-3 flex flex-col gap-5">
          <UFormField label="Content" name="content" description="The content of the article goes here" class="flex-1">
            <ArticleEditor v-model="state.content" />
          </UFormField>

          <UButton type="submit" block class="py-3" :loading="mutation.isPending.value">
            Publish Article
          </UButton>
        </div>
      </div>
    </UForm>
  </DashboardPage>
</template>