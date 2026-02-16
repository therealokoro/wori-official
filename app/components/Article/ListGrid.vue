<script lang="ts" setup>
import type { BlogPostProps } from '@nuxt/ui'

defineProps<{ posts: BlogPostProps[] }>()
</script>

<template>
  <UBlogPosts :posts="posts" />
</template>
