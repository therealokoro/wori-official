<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { z } from 'zod'

type Schema = z.output<typeof UpdateArticleSchema>

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const toast = useToast()
const { $orpc } = useNuxtApp()

const { data, status, error } = useQuery(
  $orpc.articles.getOne.queryOptions({ input: { slug: slug.value } })
)

const article = computed(() => data.value)

const state = reactive<Partial<Schema>>({
  title: undefined,
  description: undefined,
  content: undefined,
  coverImage: undefined,
})

watch(article, (val) => {
  if (!val)
    return
  state.title = val.title
  state.description = val.description
  state.content = val.content
  // Keep the existing filename so validation passes when no new image is picked.
  // ArticleCoverUpload will show the preview; if the user picks a new file it
  // replaces this string with a File object.
  state.coverImage = val.coverImage ?? undefined
}, { immediate: true })

const mutation = useMutation($orpc.articles.update.mutationOptions())

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!article.value)
    return

  const { coverImage, ...rest } = event.data

  mutation.mutate({
    id: article.value.id,
    ...rest,
    // Only include coverImage if the user picked a new file
    ...(coverImage instanceof File ? { coverImage } : {}),
  }, {
    onSuccess() {
      toast.add({ title: 'Article updated successfully', color: 'success' })
      navigateTo('/admin/articles')
    },
    onError(e) {
      toast.add({ title: 'Failed to update article', description: e.message, color: 'error' })
    },
  })
}
</script>

<template>
  <DashboardPage :status :error :title="`Edit ${article?.title ?? 'Article'}`">
    <div class="mb-5">
      <ui-text type="title">
        Edit Article
      </ui-text>
      <ui-text type="small">
        Update the fields below and republish.
      </ui-text>
    </div>

    <div v-if="status === 'pending'" class="grid lg:grid-cols-5 gap-5">
      <div class="col-span-1 lg:col-span-2 space-y-5">
        <USkeleton class="h-10 rounded-md" />
        <USkeleton class="h-20 rounded-md" />
        <USkeleton class="h-40 rounded-md" />
      </div>
      <div class="col-span-1 lg:col-span-3">
        <USkeleton class="h-96 rounded-md" />
      </div>
    </div>

    <UAlert
      v-else-if="status === 'error'"
      color="error"
      title="Article not found"
      description="The article you're trying to edit could not be loaded."
      class="mb-4"
    >
      <template #footer>
        <UButton variant="soft" color="error" to="/admin/articles">
          Back to Articles
        </UButton>
      </template>
    </UAlert>

    <UForm v-else :schema="UpdateArticleSchema" :state="state" class="space-y-4" @submit="onSubmit">
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
            <UTextarea
              v-model="state.description"
              placeholder="A short sentence that best describes the article"
              class="w-full"
              :rows="3"
              autoresize
            />
          </UFormField>

          <UFormField label="Cover Image" name="coverImage" hint="Max size: 2MB">
            <ArticleCoverUpload
              v-model="state.coverImage"
              :existing-url="article?.coverImage ? `/images/${article.coverImage}` : null"
            />
          </uformfield>
        </div>

        <div class="col-span-1 lg:col-span-3 flex flex-col gap-5">
          <UFormField label="Content" name="content" description="The content of the article goes here" class="flex-1">
            <ArticleEditor v-model="state.content" />
          </UFormField>

          <div class="flex gap-3">
            <UButton variant="soft" color="neutral" to="/admin/articles" class="py-3">
              Cancel
            </UButton>
            <UButton type="submit" block class="py-3" :loading="mutation.isPending.value">
              Update Article
            </UButton>
          </div>
        </div>
      </div>
    </UForm>
  </DashboardPage>
</template>