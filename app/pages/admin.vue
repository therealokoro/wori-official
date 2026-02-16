<script setup lang="ts">
definePageMeta({ layout: 'plain', auth: 'user' })

const open = ref(false)
function closeMenu() {
  open.value = false
}

const links = useActivePageLink<any>([
  {
    label: 'Overview',
    icon: 'i-lucide-house',
    to: '/admin',
    onSelect: closeMenu,
  },
  {
    label: 'Articles',
    icon: 'lucide:newspaper',
    to: '/admin/articles',
    onSelect: closeMenu,
  },
  {
    label: 'Gallery',
    icon: 'lucide:image',
    to: '/admin/gallery',
    onSelect: closeMenu,
  },
  {
    label: 'Inbox',
    icon: 'i-lucide-inbox',
    to: '/admin/inbox',
    onSelect: closeMenu,
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/admin/settings',
    type: 'trigger'
  }
])
// satisfies NavigationMenuItem[][]
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header>
        <div class="mx-auto">
          <PageLogo />
        </div>
      </template>

      <template #default>
        <UNavigationMenu
          :ui="{ list: 'flex flex-col gap-2' }"
          :items="links"
          orientation="vertical"
          tooltip
          popover
        />
      </template>
    </UDashboardSidebar>

    <div class="w-full flex flex-col">
      <UDashboardToolbar class="lg:px-8">
        <ui-text type="subtitle">
          Dashboard
        </ui-text>
      </UDashboardToolbar>

      <UContainer class="py-5 flex-1 overflow-y-auto overflow-x-hidden">
        <NuxtPage />
      </UContainer>
    </div>

    <!-- <NotificationsSlideover /> -->
  </UDashboardGroup>
</template>
