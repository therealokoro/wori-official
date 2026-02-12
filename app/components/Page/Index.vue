<script lang="ts" setup>
const { title, description } = defineProps<{
  title?: string
  description?: string
  noHeader?: boolean
}>()

useSeoMeta({ title, description })
</script>

<template>
  <div class="relative flex flex-col w-full" :class="noHeader ? '' : 'pt-(--ui-header-height)'">
    <div v-if="$slots.hero" class="relative">
      <slot name="hero" />
    </div>

    <!-- Render Error Page -->
    <!-- <PageError
      v-if="error"
      :error
    /> -->

    <!-- Acutal Page Content -->
    <main>
      <slot />
    </main>
  </div>
</template>
