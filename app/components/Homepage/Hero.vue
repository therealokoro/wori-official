<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

const links: ButtonProps[] = [
  {
    label: 'Learn More',
    to: '/overview',
    trailingIcon: 'i-lucide-arrow-right',
    size: 'xl'
  },
  {
    label: 'Donate Now',
    to: '/donate',
    icon: 'lucide:dollar-sign',
    size: 'xl',
    color: 'neutral',
    variant: 'subtle'
  }
]
</script>

<template>
  <section class="relative min-h-max">
    <UPageHero
      title="Championing Women's Rights, Transforming Lives"
      description="Empowering women, promoting gender equality, and advocating for social justice, we envision a future where women's rights are respected, protected, and recognized, and their voices are valued and heard."
      :links
    />

    <div class="absolute -z-1 top-0 left-0 min-h-screen w-full bg-white">
      <div
        class="absolute inset-0 z-0"
        :style="{
          backgroundImage: `radial-gradient(125% 120% at 50% 90%, #ffffff 30%, #f51a8a 100%)`,
          backgroundSize: '100% 100%',
        }"
      />
    </div>
  </section>
</template>
