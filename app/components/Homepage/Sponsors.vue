<script lang="ts" setup>
const sponsors1 = [
  { type: "lg", image: "/logos/care-logo.jpg", alt: "Care" },
  { type: "lg", image: "/logos/kesca.png", alt: "KESCA" },
  { type: "lg", image: "/logos/kebbi-gov.png", alt: "Kebbi State Government" },
  { type: "lg", image: "/logos/usaid-logo.png", alt: "USAID" },
  { type: "lg", image: "/logos/coat-of-arm.png", alt: "The Nigerian Government" },
  { type: "lg", image: "/logos/wrapa-logo.png", alt: "WRAPA" }
]
const sponsors2 = [
  { type: "sm", image: "/logos/leprosy-mission-logo.png", alt: "The Leprosy Mission" },
  { type: "sm", image: "/logos/engender-logo.png", alt: "Engender Health" },
  { type: "sm", image: "/logos/gain-logo.png", alt: "Gain" },
  { type: "sm", image: "/logos/helpline-logo.png", alt: "Helpline Abuja" },
  { type: "sm", image: "/logos/toto-logo.jpg", alt: "Toto Center Initiative" }
]
</script>

<template>
  <UPageSection
    :ui="{ container: 'py-10 lg:py-16' }"
    title="Our Sponsors and Partners"
    description="We are backed by some of the biggest names in and around Nigeria and Africa at large"
  >
    <div class="w-full max-w-3xl mx-auto mt-10 flex flex-wrap flex-center gap-7">
      <UMarquee :ui="{ root: '[--gap:--spacing(8)]' }">
        <div v-for="i in sponsors1" class="mx-7 w-12.5 md:w-17.5">
          <NuxtImg
            class="object-contain w-full h-full"
            format="webp"
            :alt="i.alt"
            :src="i.image"
          />
        </div>
      </UMarquee>
      <UMarquee reverse>
        <div v-for="i in sponsors2" class="w-25 mx-7">
          <NuxtImg
            class="object-contain w-full h-full"
            format="webp"
            :alt="i.alt"
            :src="i.image"
          />
        </div>
      </UMarquee>
    </div>
  </UPageSection>
</template>
