<script lang="ts" setup>
const title = 'Articles'
const description = 'Get the latest news and information about WORI and read about our events.'

const { $orpc } = useNuxtApp()
const { data, isPending } = useQuery($orpc.articles.getAll.queryOptions())
const posts = computed(() =>
  data.value?.map(curr => ({ ...curr, to: `/articles/${curr.slug}` })) ?? [],
) 
</script>

<template>
  <Page :title :description>
    <UPageSection :title :description>
      <UPageGrid v-if="isPending">
        <USkeleton v-for="i in 3" :key="i" class="h-52 rounded-xl" />
      </UPageGrid>

      <UEmpty
        v-else-if="!posts.length"
        size="xl"
        variant="naked"
        icon="i-lucide-bell"
        title="No Articles"
        description="You're all caught up. There are no articles to read yet!"
      />

      <UBlogPosts v-else :posts="posts" />
    </UPageSection>
  </Page>
</template>
