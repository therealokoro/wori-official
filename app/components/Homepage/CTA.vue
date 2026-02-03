<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

const links: ButtonProps[] = [
  {
    label: 'Donate Now',
    to: '/donate',
    icon: 'lucide:dollar-sign',
    size: 'xl',
    variant: 'subtle'
  }
]
</script>

<template>
  <UPageSection :ui="{ container: 'py-0' }">
    <UPageCTA
      title="Make a donation today"
      description="As we work to build a better future for women and our community, Be a part of our story and help us build that future together"
      variant="subtle"
      orientation="horizontal"
      :links
    >
      <nuxt-img
        src="/women-smiling.jpg"
        width="220"
        height="264"
        alt="Illustration"
        class="w-full rounded-lg"
      />
    </UPageCTA>
  </UPageSection>
</template>
