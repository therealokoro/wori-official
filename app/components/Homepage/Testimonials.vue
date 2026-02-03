<script lang="ts" setup>
const testimonials = [
  {
    quote: "I've seen WORI's advocacy impact firsthand. They've helped develop policies prioritizing women and vulnerable groups in climate change. Their expertise is invaluable. WORI is a true asset to our community.",
    user: {
      name: "Hon. Fatima Buba",
      description: "Community Leader",
      avatar: { icon: "mingcute:message-4-line" }
    }
  },
  {
    quote: "WORI's economic empowerment program helped me start my own business and become financially independent. The training and mentorship were top-notch. I'm now able to provide for my family. I'm grateful for WORI's support.",
    user: {
      name: "Hajia Zainab",
      description: "Entrepreneur",
      avatar: { icon: "mingcute:message-4-line" }
    }
  },
  {
    quote: "WORI's support and counseling helped me heal from domestic violence and rebuild my life. I was given the tools to overcome my trauma. WORI's commitment to ending violence against women is inspiring. I'm thankful for their help.",
    user: {
      name: "Anonymous",
      description: "Survivor of Domestic Violence",
      avatar: { icon: "mingcute:message-4-line" }
    }
  }
]
</script>

<template>
  <UPageSection title="Some Testimonials" class="relative">
    <UPageColumns>
      <UPageCard v-for="item in testimonials" :description="item.quote" variant="subtle">
        <template #footer>
          <UUser v-bind="item.user" />
        </template>
      </UPageCard>
    </UPageColumns>

    <div
      class="absolute inset-0 z-0"
      style="
        background-image:
          radial-gradient(circle at 20% 80%, rgba(255, 160, 146, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 244, 228, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 160, 146, 0.15) 0%, transparent 50%);
      "
    />
  </UPageSection>
</template>
