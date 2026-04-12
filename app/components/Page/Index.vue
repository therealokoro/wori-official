<script lang="ts" setup>
const { title, description, error, loading } = defineProps<{
  title?: string
  description?: string
  error?: Error
  loading?: boolean
  noHeader?: boolean
}>()

if (error) {
  useSeoMeta({ title: error.message ?? "An error occurred" })
} else {
  useSeoMeta({ title, description })
}
</script>

<template>
  <div
    class="relative flex flex-col w-full"
    :class="{ 'pt-(--ui-header-height)': !noHeader }"
  >
    <template v-if="loading">
      <div class="min-h-[70vh] flex items-center justify-center">
        <UIcon name="i-lucide-loader-circle" class="size-6 text-muted animate-spin" />
      </div>
    </template>

    <template v-else-if="error">
      <PageError :error />
    </template>

    <template v-else>
      <div v-if="$slots.hero" class="relative">
        <slot name="hero" />
      </div>
      
      <main>
        <slot />
      </main>
    </template>
  </div>
</template>