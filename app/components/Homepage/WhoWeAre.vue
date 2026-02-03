<script lang="ts" setup>
  const content1 = [
    {
      title: "Who We Are",
      body: `WORI (Women Rights Initiative) is a non-governmental organization 
      dedicated to empowering women, children, persons with disabilities, 
      widows, and vulnerable communities by advocating for their rights and supporting gender
      based violence victims,climate change action. We aim to create a
      sustainable and inclusive society where all individuals can thrive,
      free from discrimination and inequity.`
    },
    {
      title: "Our Vision",
      body: `We envision a world where women and girls are empowered to reach
      their full potential, free from gender-based violence,
      discrimination, and marginalization. Children and youth are nurtured
      and protected, with access to quality education, healthcare, and
      opportunities for growth and development. Persons with disabilities
      are valued and included, with equal access to resources, services,
      and opportunities for participation and contribution.`
    }
  ]

  const content2 = [
    {
      title: "Our Mission",
      body: `To empower women, vulnerable groups, and marginalized populations to reach their full potential, we are committed to fostering a transformative and inclusive movement that promotes climate justice, human rights, and sustainable development, through advocacy, education, and access to resources, ensuring that their voices are amplified, their rights are recognized, respected, and protected, and they can thrive in a climate-resilient world that is equitable, just, and sustainable for all.`
    },
    {
      title: "Our Goals",
      body: `To achieve transformative impact, we aim to ensure at least 50% representation of women and vulnerable groups in climate decision-making, provide training and capacity-building for over 1,000 individuals annually, reach 5,000 individuals with critical health services and GBV support, and influence three key policies protecting the rights and dignity of women, children, and vulnerable populations in the context of climate change by 2030.`
    }
  ]
</script>

<template>
  <UPageSection title="Who We Are" :ui="{ title: 'text-white' }" class="bg-gray-900">
    <div class="card">
      <div
        v-for="(item, i) in content1"
        class="card__inner"
        :class="i % 2 ? 'bg-primary lg:bg-gray-900' : 'bg-gray-900 lg:bg-primary'"
      >
        <ui-text type="title">{{ item.title }}</ui-text>
        <ui-text class="font-medium mt-8">{{ item.body }}</ui-text>
      </div>
    </div>

    <div class="card">
      <div
        v-for="(item, i) in content2"
        class="card__inner"
        :class="i % 2 ? 'bg-primary' : 'bg-gray-900'"
      >
        <ui-text type="title">{{ item.title }}</ui-text>
        <ui-text class="font-medium mt-8">{{ item.body }}</ui-text>
      </div>
    </div>
  </UPageSection>
</template>

<style lang="css" scoped>
@reference '../../assets/css/main.css';

.card{
  @apply w-full grid grid-cols-1 lg:grid-cols-2;
}

.card__inner{
  @apply p-7 md:p-10 text-white flex-1;
}
</style>
