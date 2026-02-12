<script lang="ts" setup>
import type { BlogPostProps } from '@nuxt/ui'

const title = 'Articles'
const description = 'Get the latest news and information about WORI and read about our events.'

const posts = ref<BlogPostProps[]>([
  {
    title: 'Nuxt Icon v1',
    description: 'Discover Nuxt Icon v1!',
    image: 'https://nuxt.com/assets/blog/nuxt-icon/cover.png',
    date: '2024-11-25'
  },
  {
    title: 'Nuxt 3.14',
    description: 'Nuxt 3.14 is out!',
    image: 'https://nuxt.com/assets/blog/v3.14.png',
    date: '2024-11-04'
  },
  {
    title: 'Nuxt 3.13',
    description: 'Nuxt 3.13 is out!',
    image: 'https://nuxt.com/assets/blog/v3.13.png',
    date: '2024-08-22'
  }
])
</script>

<template>
  <Page :title :description>
    <UPageSection :title :description>
      <UBlogPosts :posts="posts" />
    </UPageSection>
  </Page>
</template>
