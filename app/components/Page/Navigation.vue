<script lang="ts" setup>
const links = useAppConfig().navigation
const menuLinks = useActivePageLink(links)
// const isSidebarActive = ref(false)
// useNuxtApp().hook("page:finish", () => {
// isSidebarActive.value = false
// })
</script>

<template>
  <UNavigationMenu content-orientation="vertical" :items="menuLinks" :ui="{ link: 'text-xs', list: 'gap-2' }" />
</template>
