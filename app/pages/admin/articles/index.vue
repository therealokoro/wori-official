<script lang="ts" setup>
const { $orpc } = useNuxtApp()
const { data, isPending, refetch } = useQuery(computed(() => $orpc.articles.getAll.queryOptions()))

const posts = computed(() =>
  data.value?.map(curr => ({ ...curr, to: `/admin/articles/${curr.slug}` })) ?? [],
) 

async function refreshList() {
  await refetch()
}
</script>

<template>
  <Page no-header title="Manage Articles">
    <div class="mb-5">
      <UButton to="/admin/articles/new">
        Create New Article
      </UButton>
    </div>

    <ArticleListGrid
      :loading="isPending"
      :posts
      admin
      @delete="refreshList"
    />
  </Page>
</template>
