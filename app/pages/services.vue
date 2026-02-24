<script lang="ts" setup>
const services = [
  {
    title: 'Empowering Women Against GBV',
    body: 'WORI combats GBV through workshops, counseling, and awareness campaigns.',
    no: '1',
    icon: 'mingcute:heart-hand-line',
  },
  {
    title: 'Supporting Persons with Disabilities',
    body: 'WORI provides inclusive programs for persons with disabilities, promoting accessibility and empowerment.',
    no: '2',
    icon: 'mingcute:disabled-line',
  },
  {
    title: 'Advocating for Sickle Cell Patients',
    body: 'WORI advocates for sickle cell patients\' reproductive health rights, ensuring equitable access to services.',
    no: '3',
    icon: 'lets-icons:blood',
  },
  {
    title: 'Climate Action for Gender Equality',
    body: 'WORI promotes climate action considering gender perspectives, empowering women in sustainability efforts.',
    no: '4',
    icon: 'lucide:handshake',
  },
  {
    title: 'Promoting Women\'s Rights and Empowerment',
    body: 'WORI promotes women\'s rights and empowerment through education, advocacy, and support services.',
    no: '5',
    icon: 'streamline:woman-symbol-solid',
  },
  {
    title: 'Fostering Community Engagement and Change',
    body: 'WORI fosters community engagement and social change through workshops, training, and advocacy initiatives.',
    no: '6',
    icon: 'tabler:users-group',
  },
]
</script>

<template>
  <Page title="Our Services">
    <UPageSection title="Our Services">
      <UPageGrid>
        <UPageFeature v-for="i in services" :key="i.no" :title="i.title" :icon="i.icon" :description="i.body" />
      </UPageGrid>
    </UPageSection>
  </Page>
</template>
