<script lang="ts" setup>
import "~/assets/css/prose.css"

const slug = useRoute("articles-slug").params.slug?.toString()
const { $orpc } = useNuxtApp()

const slugError = !slug ? new Error("Article not found") : undefined

const { data: article, isPending, error } = useQuery($orpc.articles.getOne.queryOptions({
  input: { slug: slug as string },
  enabled: !!slug,
}))

const coverImageUrl = computed(() => "/images/" + article.value?.coverImage)

const siteUrl = getSiteUrl()

useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.description,
  ogTitle: () => article.value?.title,
  ogDescription: () => article.value?.description,
  ogImage: () => coverImageUrl.value ? `${siteUrl}/images/${article.value?.coverImage}` : undefined,
  ogType: 'article',
  ogUrl: () => `${siteUrl}/articles/${slug}`,
  twitterCard: 'summary_large_image',
  twitterTitle: () => article.value?.title,
  twitterDescription: () => article.value?.description,
  twitterImage: () => coverImageUrl.value ? `${siteUrl}/images/${article.value?.coverImage}` : undefined,
  articlePublishedTime: () => article.value?.createdAt,
})
</script>

<template>
  <Page
    :title="article?.title"
    :description="article?.description"
    :loading="isPending"
    :error="slugError ?? error ?? undefined"
  >
    <UContainer v-if="article">
      <UPage>
        <UPageHeader
          :title="article.title"
          :description="article.description"
          :headline="formatDate(article.createdAt)"
          class="col-span-full border-b-0"
        >
          <ArticleShareButtons
            :title="article.title"
            :description="article.description"
          />
        </UPageHeader>

        <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
          <!-- Main -->
          <article class="col-span-1 lg:col-span-2 space-y-8">
            <div class="w-full aspect-16/7 overflow-hidden rounded-xl">
              <NuxtImg
                :src="coverImageUrl"
                :alt="article.title"
                densities="x1"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="wysiwyg" v-html="article.content" />
          </article>

          <!-- Aside -->
          <aside class="col-span-1 space-y-5">
            <ArticleRelatedList :articles="article.related" />
          </aside>
        </div>
      </UPage>
    </UContainer>
  </Page>
</template>