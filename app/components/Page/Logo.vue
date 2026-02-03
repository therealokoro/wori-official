<script lang="ts" setup>
defineProps<{ dark?: boolean }>()
</script>

<template>
  <nuxt-link to="/" class="flex items-center gap-2">
    <NuxtImg src="wori-icon.svg" width="50" />

    <p
      class="uppercase font-black text-xs leading-4"
      :class="dark ? 'text-white' : 'text-foreground'"
    >
      <span>Women Rights</span>
      <br>
      <span>Initiative</span>
    </p>
  </nuxt-link>
</template>
