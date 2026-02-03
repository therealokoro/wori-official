<script lang="ts" setup>
  const { title, description } = defineProps<{ title?: string, description?: string }>()
  
  useSeoMeta({ title, description })
</script>

<template>
  <div class="relative flex flex-col w-full pt-(--ui-header-height)">
    <div class="relative" v-if="$slots.hero">
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