<script lang="ts" setup>
import type { BlogPostProps } from '@nuxt/ui'

type Post = BlogPostProps & { id: string, slug: string }

defineProps<{
  posts: Post[]
  loading?: boolean
  admin?: boolean
}>()

const emit = defineEmits<{
  delete: [post: Post]
}>()

const { $orpc } = useNuxtApp()
const toast = useToast()

const deletingId = ref<string | null>(null)
const mutation = useMutation($orpc.articles.deleteOne.mutationOptions())

function confirmDelete(post: Post) {
  deletingId.value = post.id ?? null
}

function onDelete(post: Post) {
  mutation.mutate({ id: post.id! }, {
    onSuccess() {
      toast.add({ title: 'Article deleted succesfully', color: 'success' })
      deletingId.value = null
      emit('delete', post)
    },
    onError(e) {
      toast.add({ title: 'Failed to delete article', description: e.message, color: 'error' })
    },
  })
}
</script>

<template>
  <UPageGrid v-if="loading">
    <USkeleton v-for="i in 6" :key="i" class="h-52 rounded-xl" />
  </UPageGrid>

  <UPageGrid v-else>
    <div
      v-for="post in posts"
      :key="post.id"
      class="group relative flex flex-col overflow-hidden rounded-xl border border-default bg-default hover:bg-elevated transition-colors duration-200"
    >
      <!-- Cover Image -->
      <div class="relative w-full h-36 overflow-hidden bg-elevated shrink-0">
        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        >
        <div v-else class="w-full h-full flex items-center justify-center">
          <UIcon name="i-lucide-image" class="size-8 text-muted" />
        </div>

        <!-- Admin actions -->
        <div v-if="admin" class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <UButton
            :to="`/admin/articles/${post.slug}`"
            icon="i-lucide-pencil"
            color="neutral"
            variant="solid"
            size="xs"
          />
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="solid"
            size="xs"
            @click.prevent="confirmDelete(post)"
          />
        </div>
      </div>

      <!-- Content -->
      <NuxtLink :to="post.to" class="flex flex-col gap-1 p-4 flex-1 min-w-0">
        <p class="text-xs text-muted">
          {{ post.date }}
        </p>
        <p class="text-sm font-semibold text-default leading-snug line-clamp-2">
          {{ post.title }}
        </p>
        <p class="text-xs text-muted line-clamp-2 mt-0.5">
          {{ post.description }}
        </p>
      </NuxtLink>
    </div>
  </UPageGrid>

  <!-- Delete confirmation modal -->
  <UModal
    :open="!!deletingId"
    title="Delete Article"
    description="This action cannot be undone. The article will be permanently removed."
    @update:open="deletingId = null"
  >
    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          label="Cancel"
          color="neutral"
          variant="soft"
          @click="deletingId = null"
        />
        <UButton
          label="Delete"
          color="error"
          :loading="mutation.isPending.value"
          @click="onDelete(posts.find(p => p.id === deletingId)!)"
        />
      </div>
    </template>
  </UModal>
</template>
