<script lang="ts" setup>
const { $orpc } = useNuxtApp()
const { data } = useQuery($orpc.articles.getAll.queryOptions())
const posts = computed(() => data.value || [])
</script>

<template>
  <Page no-header title="Manage Articles">
    <div class="mb-5">
      <UButton to="/admin/articles/new">
        Create New Article
      </UButton>
    </div>

    <ArticleListGrid :posts />
  </Page>
</template>
