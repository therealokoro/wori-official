<script lang="ts" setup>
  const [contact1, contact2] = useAppConfig().info.contacts
  const { y } = useWindowScroll()
</script>

<template>
  <div
    :class="{ 'bg-white shadow': y >=10 }"
    class="fixed top-0 left-0 w-full h-(--ui-header-height) z-10 transition-all ease-in-out"
  >
    <!-- Header Content -->
    <UHeader class="border-0 border-t-3 border-primary">
      <template #left>
        <!-- Logo -->
        <PageLogo />
      </template>

      <template #right>
        <!-- Navigation -->
        <PageNavigation />
      </template>
    </UHeader>
  </div>
</template>
