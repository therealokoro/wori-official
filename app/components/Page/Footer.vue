<script setup lang="ts">
const items = [
  ...useAppConfig().navigation,
  {
    label: "Privacy Policy",
    to: "/#"
  },
  {
    label: "Login",
    to: "/login"
  }
]

const socialLinks = useAppConfig().info.socialLinks
</script>

<template>
  <UFooter class="bg-gray-900 py-6">
    <template #left>
      <PageLogo dark />
    </template>
    
    <div class="flex flex-col flex-center">
      <UNavigationMenu :ui="{ link: 'text-xs text-white hover:text-primary' }" :items="items" variant="link" />
      <p class="text-sm text-white">© {{ new Date().getFullYear() }} • All Rights Reserved | WORI </p>
    </div>

    <template #right>
      <UButton
        v-for="(item, i) in socialLinks"
        :key="i"
        :aria-label="item.label"
        :icon="item.icon"
        :to="item.to"
        class="text-white hover:bg-gray-800"
        variant="ghost"
        target="_blank"
      />
    </template>
  </UFooter>
</template>
