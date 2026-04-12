<script lang="ts" setup>
defineProps<{
  articles: {
    id: string
    title: string
    slug: string
    coverImage: string
    createdAt: string
  }[]
}>()
</script>

<template>
  <aside v-if="articles.length" class="space-y-0">
    <p class="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
      More articles
    </p>

    <NuxtLink
      v-for="item in articles"
      :key="item.id"
      :to="`/articles/${item.slug}`"
      class="flex gap-3 py-3 border-b border-border last:border-none hover:opacity-75 transition-opacity"
    >
      <div class="size-16 rounded-lg overflow-hidden shrink-0">
        <NuxtImg
          :src="'/images/' + item.coverImage"
          :alt="item.title"
          densities="x1"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="flex-1 min-w-0 space-y-1">
        <p class="text-sm font-medium text-foreground leading-snug line-clamp-2">
          {{ item.title }}
        </p>
        <p class="text-[11px] text-muted-foreground">
          {{ formatDate(item.createdAt) }}
        </p>
      </div>
    </NuxtLink>
  </aside>
</template>