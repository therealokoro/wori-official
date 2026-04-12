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
      <ClientOnly>
        <template #fallback>
          <UPageGrid>
            <USkeleton v-for="i in 3" :key="i" class="h-52 rounded-xl" />
          </UPageGrid>
        </template>

        <UPageGrid v-if="isPending">
          <USkeleton v-for="i in 3" :key="i" class="h-52 rounded-xl" />
        </UPageGrid>

        <ArticleEmptyPlaceholder v-else-if="!posts.length" />

        <UBlogPosts v-else :posts />
      </ClientOnly>
    </UPageSection>
  </Page>
</template>