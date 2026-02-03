<script lang="ts" setup>
const stats = [
  {
    "title": "Empowerment Workshops",
    "figure": "100+",
    "body": "WORI conducted 100+ workshops, reaching 10,000+ women. Empowering them with leadership and entrepreneurship skills."
  },
  {
    "title": "Increased Awareness Campaigns",
    "figure": "75%",
    "body": "WORI increased awareness on women's rights by 75%. Fostering a supportive environment for women's empowerment."
  },
  {
    "title": "Legal Aid Services",
    "figure": "500+",
    "body": "WORI provided legal aid to 500+ women. Ensuring support and justice for those facing domestic violence and discrimination."
  }
]
</script>

<template>
  <UPageSection class="relative bg-gray-900">
    <div class="w-full grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div
        class="col-span-1 md:col-span-2 flex justify-center flex-col gap-4 text-white text-center md:text-left"
      >
        <ui-text type="headline">We have a proven track record of achievements.</ui-text>
        <ui-text>These numbers are written evidence of years of dedication to helping humanity.</ui-text>
      </div>

      <div
        class="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div
          v-for="i in stats"
          class="p-7 space-y-2 last:md:col-start-2 bg-white"
        >
          <ui-text class="text-primary" type="heading">{{ i.figure }}</ui-text>
          <ui-text class="font-semibold">{{ i.title }}</ui-text>
          <ui-text type="small">{{ i.body }}</ui-text>
        </div>
      </div>
    </div>

    <div
      class="absolute inset-0 z-0 pointer-events-none"
      style="
        background-image:
          repeating-linear-gradient(45deg, rgba(0, 255, 65, 0.08) 0, rgba(0, 255, 65, 0.08) 1px, transparent 1px, transparent 12px),
          repeating-linear-gradient(-45deg, rgba(0, 255, 65, 0.08) 0, rgba(0, 255, 65, 0.08) 1px, transparent 1px, transparent 12px),
          repeating-linear-gradient(90deg, rgba(0, 255, 65, 0.03) 0, rgba(0, 255, 65, 0.03) 1px, transparent 1px, transparent 4px);
        background-size: 24px 24px, 24px 24px, 8px 8px;
      "
    />
  </UPageSection>
</template>
