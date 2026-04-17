<script setup lang="ts">
const baseNav = useAppConfig().navigation
const items = computed(() => {
  return [
    ...baseNav.filter(c => c.label !== 'About Us'),
    { label: 'About Us', to: '/about/overview' },
    { label: 'Privacy Policy', to: '/#' },
    { label: 'Login', to: '/login' }
  ]
})

const socialLinks = useAppConfig().info.socialLinks
</script>

<template>
  <UFooter class="bg-gray-900 py-6 px-10">
    <template #left>
      <PageLogo dark />
    </template>

    <div class="flex flex-col flex-center">
      <ul class="flex justify-center flex-wrap gap-4 mb-5">
        <li v-for="item in items" class="">
          <NuxtLink class="text-xs text-white hover:text-primary" :to="item.to">{{ item.label }}</NuxtLink>
        </li>
      </ul>
      <!-- <UNavigationMenu
        :ui="{ link: 'text-xs text-white hover:text-primary', list: 'min-w-lg' }"
        :items="items" variant="link"
      /> -->
      
      <p class="text-sm text-dimmed">
        © {{ new Date().getFullYear() }} • All Rights Reserved | WORI
      </p>
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
