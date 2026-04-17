<!-- PageNavigation.vue -->
<script lang="ts" setup>
defineProps<{ mobile?: boolean }>()

const links = useAppConfig().navigation
const menuLinks = useActivePageLink(links)
</script>

<template>
  <UNavigationMenu
    :orientation="mobile ? 'vertical' : 'horizontal'"
    content-orientation="vertical"
    :items="menuLinks"
    :ui="{
      link: 'text-xs',
      list: mobile ? 'flex-col w-full gap-1' : 'gap-2',
    }"
  />
</template>