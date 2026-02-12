<script lang="ts" setup>
const team = [
  {
    name: 'Dr. Amb. Laiatu Augustine Bamaiyi',
    post: 'Founder & CEO',
    img: '/dr-laiatu.jpg'
  },
  {
    name: 'Mr. Solomon Liman Ahore',
    post: 'Chairman Board Member',
    img: '/mr-solomon.jpg'
  }
]
</script>

<template>
  <Page
    title="Meet the Team"
    description="Read all about WORI, how it was formed and much more"
  >
    <UPageSection
      title="Meet Our Leadership"
      description="The passionate individuals driving WORI’s vision and mission forward."
    >
      <!-- Flex Layout -->
      <div class="flex flex-wrap justify-center gap-12">
        <UCard
          v-for="member in team"
          :key="member.name"
          class="flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl max-w-xs"
        >
          <!-- Square Image -->
          <div class="aspect-square w-full overflow-hidden rounded-2xl">
            <NuxtImg
              :src="member.img"
              :alt="member.name"
              class="w-full h-full object-cover"
              format="webp"
              quality="80"
            />
          </div>

          <!-- Content -->
          <div class="mt-6">
            <h3 class="text-lg font-semibold">
              {{ member.name }}
            </h3>

            <UBadge
              color="primary"
              variant="soft"
              class="mt-3"
            >
              {{ member.post }}
            </UBadge>
          </div>
        </UCard>
      </div>
    </UPageSection>
  </Page>
</template>
