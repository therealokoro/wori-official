<script lang="ts" setup>
const { y } = useWindowScroll()
const isMenuOpen = ref(false)

// Close menu on route change
useNuxtApp().hook('page:finish', () => {
  isMenuOpen.value = false
})
</script>

<template>
  <div
    :class="y >= 10 ? 'bg-white dark:bg-gray-900 shadow-sm' : 'bg-transparent'"
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-t-3 border-primary"
  >
    <UHeader class="border-0" :toggle="false">
      <template #left>
        <PageLogo />
      </template>

      <template #right>
        <!-- Desktop nav -->
        <div class="hidden md:flex">
          <PageNavigation />
        </div>

        <!-- Mobile hamburger -->
        <button
          class="flex md:hidden items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <UIcon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-5 h-5" />
        </button>
      </template>
    </UHeader>

    <!-- Mobile dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-4 shadow-lg"
      >
        <PageNavigation mobile />
      </div>
    </Transition>
  </div>
</template>